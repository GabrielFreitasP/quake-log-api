import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { Game } from '../game/entities/game.entity';
import { BuildPlayer } from './builder/player.builder';
import { LogTagEnum } from '../file/enums/log-tag.enum';
import { LoggerService } from '../commons/logger/logger.service';

@Injectable()
export class PlayerService {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(Player)
    private readonly repository: Repository<Player>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findBy({ id });
  }

  async findByName(name: string, manager?: EntityManager) {
    if (manager) {
      return await manager.findBy(Player, { name });
    }
    return await this.repository.findBy({ name });
  }

  async create(player: Player, manager?: EntityManager) {
    this.logger.debug(`Creating player: ${player.name}`);
    if (manager) {
      return await manager.save(Player, player);
    }
    return await this.repository.save(player);
  }

  async findOrCreateByName(
    playerName: string,
    cachedPlayers: Player[],
    manager: EntityManager,
  ) {
    let player = cachedPlayers.find(({ name }) => name === playerName);

    if (!player) {
      const players = await this.findByName(playerName, manager);
      player = players?.at(0);

      if (!player) {
        player = BuildPlayer(playerName);
        player = await this.create(player, manager);
      }

      cachedPlayers.push(player);
    }

    return player;
  }

  extractNameFromLine(line: string) {
    const regexPattern = new RegExp(
      `(\\d+:\\d+) ${LogTagEnum.CLIENT_USER_INFO_CHANGED}: (\\d+) n\\\\([^\\\\]+)\\\\t`,
    );
    const matchResult = line.match(regexPattern);

    if (matchResult !== null) {
      const [, , , playerName] = matchResult;
      return playerName;
    }

    return null;
  }
}
