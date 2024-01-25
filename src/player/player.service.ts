import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { Game } from '../game/entities/game.entity';
import { PlayerBuilder } from './builder/player.builder';
import { LogTagEnum } from '../file/enums/log-tag.enum';

@Injectable()
export class PlayerService {
  constructor(
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
    if (manager) {
      return await manager.save(Player, player);
    }
    return await this.repository.save(player);
  }

  async findOrCreateByLine(
    line: string,
    game: Game,
    cachedPlayers: Player[],
    manager: EntityManager,
  ) {
    const playerName = this.extractNameFromLine(line);
    return await this.findOrCreateByName(
      playerName,
      game,
      cachedPlayers,
      manager,
    );
  }

  async findOrCreateByName(
    playerName: string,
    game: Game,
    cachedPlayers: Player[],
    manager: EntityManager,
  ) {
    let player = cachedPlayers.find(({ name }) => name === playerName);

    if (!player) {
      const players = await this.findByName(playerName, manager);
      player = players?.at(0);

      if (!player) {
        player = PlayerBuilder.buildPlayer(game, playerName);
        player = await this.create(player, manager);
      }

      cachedPlayers.push(player);
    }

    return player;
  }

  private extractNameFromLine(line: string) {
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
