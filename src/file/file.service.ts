import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EntityManager, Repository } from 'typeorm';
import { InvalidArgumentException } from '../commons/exceptions/invalid-argument.exception';
import { FileReader } from '../commons/readers/file.reader';
import { FileStatusEnum } from './enums/file-status.enum';
import { KillService } from '../kill/kill.service';
import { MeansOfDeathService } from '../meansofdeath/means-of-death.service';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/entities/player.entity';
import { LogTagEnum } from './enums/log-tag.enum';
import { LineTypeEnum } from './enums/line-type.enum';
import { Game } from '../game/entities/game.entity';
import { MeansOfDeath } from '../meansofdeath/entities/means-of-death.entity';
import { BuildGame } from '../game/builder/game.builder';
import { LoggerService } from '../commons/logger/logger.service';
import { ScoreService } from '../score/score.service';
import { FindGamesDto } from './dto/find-games.dto';
import { GameByFileDto } from '../game/dto/game-by-file.dto';
import { MulterFileToFileEntity } from './mappers/file.mapper';

import configuration from '../commons/config/configuration';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly repository: Repository<File>,
    @InjectQueue(configuration().files.queueName)
    private readonly queue: Queue<File>,
    private readonly loggerService: LoggerService,
    private readonly killService: KillService,
    private readonly meansOfDeathService: MeansOfDeathService,
    private readonly playerService: PlayerService,
    private readonly scoreService: ScoreService,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findOneBy({ id });
  }

  async findGamesById(id: string) {
    const files = await this.repository.find({
      where: { id },
      relations: ['games', 'games.scores', 'games.scores.player'],
    });

    if (files.length === 0) {
      throw new NotFoundException(File, 'file not found');
    }

    const fileEntity = files[0];
    const games: FindGamesDto = {};
    fileEntity.games.forEach(({ totalKills, scores }, index) => {
      const game = new GameByFileDto();
      game.totalKills = totalKills;

      game.players = scores.map(({ player }) => player.name);

      game.kills = {};
      scores.forEach(({ player, score }) => {
        game.kills[player.name] = score;
      });

      games[Game.buildNameByIndex(index)] = game;
    });

    return games;
  }

  async create(fileEntity: File, manager?: EntityManager) {
    if (manager) {
      return await manager.save(File, fileEntity);
    }
    return await this.repository.save(fileEntity);
  }

  async update(fileEntity: File, manager?: EntityManager) {
    if (manager) {
      return await manager.save(File, fileEntity);
    }
    return await this.repository.save(fileEntity);
  }

  async updateStatus({ id, status }: File, manager?: EntityManager) {
    if (manager) {
      return await manager.update(File, { id }, { status });
    }
    return await this.repository.update({ id }, { status });
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new InvalidArgumentException({ file });
    }

    const fileEntity = MulterFileToFileEntity(file);
    const newFileEntity = await this.create(fileEntity);

    await this.queue.add(configuration().files.jobName, newFileEntity);

    return newFileEntity;
  }

  async processFile(fileEntity: File) {
    try {
      fileEntity.status = FileStatusEnum.Processing;
      await this.updateStatus(fileEntity);

      const lines = FileReader.readFileLines(fileEntity.path);
      const cachedMeansOfDeath = await this.meansOfDeathService.findAll();
      const cachedPlayers: Player[] = [];
      let currentGame: Game;
      fileEntity.games = [];

      await this.repository.manager.transaction(async (manager) => {
        for (const line of lines) {
          currentGame = await this.processLine(
            line,
            fileEntity,
            currentGame,
            cachedPlayers,
            cachedMeansOfDeath,
            manager,
          );
        }

        fileEntity.status = FileStatusEnum.Done;
        await this.update(fileEntity, manager);
      });
    } catch (e) {
      this.loggerService.error(e);

      fileEntity.status = FileStatusEnum.Error;
      await this.updateStatus(fileEntity);

      throw e;
    }
  }

  private getLineType(line: string) {
    if (line.includes(LogTagEnum.INIT_GAME + ':')) {
      return LineTypeEnum.START_GAME;
    }

    if (line.includes(LogTagEnum.CLIENT_USER_INFO_CHANGED + ':')) {
      return LineTypeEnum.CHANGE_PLAYER;
    }

    if (line.includes(LogTagEnum.KILL + ':')) {
      return LineTypeEnum.KILL;
    }

    return null;
  }

  private async processLine(
    line: string,
    fileEntity: File,
    currentGame: Game,
    cachedPlayers: Player[],
    cachedMeansOfDeath: MeansOfDeath[],
    manager: EntityManager,
  ) {
    switch (this.getLineType(line)) {
      case LineTypeEnum.START_GAME:
        currentGame = this.addGame(fileEntity);
        break;
      case LineTypeEnum.CHANGE_PLAYER:
        await this.addPlayer(line, currentGame, cachedPlayers, manager);
        break;
      case LineTypeEnum.KILL:
        await this.addKill(
          line,
          currentGame,
          cachedPlayers,
          cachedMeansOfDeath,
          manager,
        );
        break;
    }
    return currentGame;
  }

  private addGame(fileEntity: File) {
    const game = BuildGame(fileEntity);
    fileEntity.games.push(game);
    return game;
  }

  private async addPlayer(
    line: string,
    game: Game,
    cachedPlayers: Player[],
    manager: EntityManager,
  ) {
    const playerName = this.playerService.extractNameFromLine(line);

    const players = game.players.find(({ name }) => name === playerName);
    if (players) return;

    const player = await this.playerService.findOrCreateByName(
      playerName,
      game,
      cachedPlayers,
      manager,
    );

    game.addPlayer(player);
  }

  private async addKill(
    line: string,
    game: Game,
    cachedPlayers: Player[],
    cachedMeansOfDeath: MeansOfDeath[],
    manager: EntityManager,
  ) {
    const kill = await this.killService.createByLine(
      line,
      game,
      cachedPlayers,
      cachedMeansOfDeath,
      manager,
    );

    this.scoreService.setScoreByKill(game, kill);

    game.killFeed.push(kill);
  }
}
