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

@Injectable()
export class KillService {
  constructor(
    @InjectRepository(Kill)
    private readonly repository: Repository<Kill>,
    private readonly playerService: PlayerService,
  ) {}

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
    cachedMeansOfDeath: MeansOfDeath[],
    manager: EntityManager,
  ) {
    const { killerName, victimName, meansOfDeathTag } =
      this.extractKillFromLine(line);

    const killer = await this.playerService.findOrCreateByName(
      killerName,
      game,
      cachedPlayers,
      manager,
    );

    const victim = await this.playerService.findOrCreateByName(
      victimName,
      game,
      cachedPlayers,
      manager,
    );

    const meansOfDeath = cachedMeansOfDeath.find(
      ({ tag }) => tag === meansOfDeathTag,
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
