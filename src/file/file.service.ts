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
import { LoggerService } from '../commons/logger/logger.service';
import { ScoreService } from '../score/score.service';
import { KillsByPlayersDto } from '../game/dto/kills-by-players.dto';
import { KillsByMeansDto } from '../game/dto/kills-by-means.dto';
import { BuildGame } from '../game/builder/game.builder';

import { GameEntityToKillsByPlayersDto } from '../game/mappers/game.mapper';

import configuration from '../commons/config/configuration';
import { FileResponseDto } from './dto/file-response.dto';

@Injectable()
export class FileService {
  constructor(
    private readonly logger: LoggerService,
    @InjectQueue(configuration().files.queueName)
    private readonly queue: Queue<File>,
    @InjectRepository(File)
    private readonly repository: Repository<File>,
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

  async findKillsByPlayers(id: string) {
    const files = await this.repository.find({
      where: { id },
      relations: ['games', 'games.scores', 'games.scores.player'],
    });

    if (files.length === 0) {
      throw new NotFoundException(File, 'file not found');
    }

    const fileEntity = files[0];
    const games: Record<string, KillsByPlayersDto> = {};
    fileEntity.games.forEach((game, index) => {
      games[Game.buildNameByIndex(index)] = GameEntityToKillsByPlayersDto(game);
    });

    return games;
  }

  async findKillsByMeans(id: string) {
    const result = await this.repository
      .createQueryBuilder('file')
      .select('game.id', 'gameId')
      .addSelect('meansOfDeath.tag', 'tag')
      .addSelect('count(1)', 'killCount')
      .innerJoin('file.games', 'game')
      .innerJoin('game.kills', 'kill')
      .innerJoin('kill.meansOfDeath', 'meansOfDeath')
      .where('file.id = :id', { id })
      .groupBy('game.id, meansOfDeath.tag')
      .getRawMany();

    const games: Record<string, KillsByMeansDto> = {};
    const gameIds: string[] = [];
    result.forEach(({ gameId, tag, killCount }) => {
      let index = gameIds.findIndex((id) => id === gameId);
      if (index === -1) {
        gameIds.push(gameId);
        index = gameIds.length - 1;
      }

      if (!games[Game.buildNameByIndex(index)]) {
        games[Game.buildNameByIndex(index)] = {
          killsByMeans: {},
        };
      }

      games[Game.buildNameByIndex(index)].killsByMeans[tag] =
        parseInt(killCount);
    });

    return games;
  }

  async create(fileEntity: File, manager?: EntityManager) {
    this.logger.debug(`Creating file: ${fileEntity.filename}`);
    if (manager) {
      return await manager.save(File, fileEntity);
    }
    return await this.repository.save(fileEntity);
  }

  async update(fileEntity: File, manager?: EntityManager) {
    this.logger.debug(`Updating file: ${fileEntity.id}`);
    if (manager) {
      return await manager.save(File, fileEntity);
    }
    return await this.repository.save(fileEntity);
  }

  async updateStatus({ id, status }: File, manager?: EntityManager) {
    this.logger.debug(`Updating file (${id}) status: ${status}`);
    if (manager) {
      return await manager.update(File, { id }, { status });
    }
    return await this.repository.update({ id }, { status });
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new InvalidArgumentException({ file });
    }

    this.logger.debug(`Uploading file: ${file.filename}`);

    const fileEntity = new File().fromMulterFile(file);
    const newFileEntity = await this.create(fileEntity);

    this.logger.debug(`Add file (${fileEntity.id}) to queue: ${file.filename}`);
    await this.queue.add(configuration().files.jobName, newFileEntity);

    return new FileResponseDto().fromEntity(fileEntity);
  }

  async processFile(fileEntity: File) {
    this.logger.debug(`Starting processing file: ${fileEntity.id}`);

    fileEntity.status = FileStatusEnum.PROCESSING;
    await this.updateStatus(fileEntity);

    try {
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

        fileEntity.status = FileStatusEnum.DONE;
        await this.update(fileEntity, manager);
      });

      this.logger.debug(`File processed successfully: ${fileEntity.id}`);
    } catch (e) {
      this.logger.error(
        `Error processing file (${fileEntity.id}): ${e.message}`,
      );

      fileEntity.status = FileStatusEnum.FAILED;
      await this.updateStatus(fileEntity);

      throw e;
    }
  }

  private getLineType(line: string) {
    if (line.includes(LogTagEnum.INIT_GAME + ':')) {
      return LineTypeEnum.START_GAME;
    }

    if (line.includes(LogTagEnum.CLIENT_USER_INFO_CHANGED + ':')) {
      return LineTypeEnum.CHANGED_PLAYER;
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
      case LineTypeEnum.CHANGED_PLAYER:
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

    game.kills.push(kill);

    this.logger.debug(
      `Kill added (file ${game.file.id}) to game[${game?.file?.games?.length ?? 1}]: ${kill.killer.name} kill ${kill.victim.name} by ${kill.meansOfDeath.tag}`,
    );
  }
}
