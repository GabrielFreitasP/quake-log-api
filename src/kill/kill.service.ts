import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Kill } from './entities/kill.entity';
import { Game } from '../game/entities/game.entity';
import { MeansOfDeath } from '../meansofdeath/entities/means-of-death.entity';
import { Player } from '../player/entities/player.entity';
import { KillLineDto } from './dto/kill-line.dto';
import { LogTagEnum } from '../file/enums/log-tag.enum';
import { KillBuilder } from './builder/kill.builder';
import { PlayerService } from '../player/player.service';
import { MeansOfDeathService } from '../meansofdeath/means-of-death.service';

@Injectable()
export class KillService {
  constructor(
    @InjectRepository(Kill)
    private readonly repository: Repository<Kill>,
    private readonly playerService: PlayerService,
    private readonly meansOfDeathService: MeansOfDeathService,
  ) {}

  async create(kill: Kill, manager?: EntityManager) {
    if (manager) {
      return await manager.save(kill);
    } else {
      return await this.repository.save(kill);
    }
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findBy({ id });
  }

  async createByLine(
    line: string,
    game: Game,
    cachedPlayers: Player[],
    meansOfDeath: MeansOfDeath[],
    manager?: EntityManager,
  ) {
    const killLine = this.extractKillFromLine(line);
    return await this.createKillerOrVictimIfNotExists(
      killLine,
      game,
      meansOfDeath,
      cachedPlayers,
      manager,
    );
  }

  async createKillerOrVictimIfNotExists(
    killLine: KillLineDto,
    game: Game,
    cachedMeansOfDeath: MeansOfDeath[],
    cachedPlayers?: Player[],
    manager?: EntityManager,
  ) {
    const { killerName, victimName, meansOfDeathTag } = killLine;

    const killer = await this.playerService.getOrCreateIfNotExistBy(
      killerName,
      game,
      cachedPlayers,
      manager,
    );

    const victim = await this.playerService.getOrCreateIfNotExistBy(
      victimName,
      game,
      cachedPlayers,
      manager,
    );

    const meansOfDeath = this.meansOfDeathService.findOnArrayByTag(
      cachedMeansOfDeath,
      meansOfDeathTag,
    );

    return KillBuilder.buildKill(game, killer, victim, meansOfDeath);
  }

  private extractKillFromLine(line: string) {
    const regexPattern = new RegExp(
      `(\\d+:\\d+) ${LogTagEnum.KILL}: (\\d+) (\\d+) (\\d+): (.+) ${LogTagEnum.KILLED} (.+) ${LogTagEnum.BY} (.+)`,
    );
    const matchResult = line.match(regexPattern);

    if (matchResult !== null) {
      const [, , , , , killerName, victimName, meansOfDeathTag] = matchResult;
      return { killerName, victimName, meansOfDeathTag } as KillLineDto;
    }

    return null;
  }
}
