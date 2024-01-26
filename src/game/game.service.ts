import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { KillsByPlayersDto } from './dto/kills-by-players.dto';
import { GameEntityToKillsByPlayersDto } from './mappers/game.mapper';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly repository: Repository<Game>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findBy({ id });
  }

  async findKillFeed(id: string) {
    const games = await this.repository.find({
      where: { id },
      relations: [
        'kills',
        'kills.killer',
        'kills.victim',
        'kills.meansOfDeath',
      ],
    });

    if (games.length === 0) {
      throw new NotFoundException(Game, 'game not found');
    }

    return games[0].kills.map((kill) => kill.toText());
  }

  async findKillsByPlayers(id: string) {
    const games = await this.repository.find({
      where: { id },
      relations: ['scores', 'scores.player'],
    });

    if (games.length === 0) {
      throw new NotFoundException(Game, 'game not found');
    }

    return GameEntityToKillsByPlayersDto(games[0]);
  }

  async findKillsByMeans(id: string) {
    const result = await this.repository
      .createQueryBuilder('game')
      .select('meansOfDeath.tag', 'tag')
      .addSelect('count(1)', 'killCount')
      .innerJoin('game.kills', 'kill')
      .innerJoin('kill.meansOfDeath', 'meansOfDeath')
      .where('game.id = :id', { id })
      .groupBy('meansOfDeath.tag')
      .getRawMany();

    const killsByMeans = {};
    result.forEach(({ tag, killCount }) => {
      killsByMeans[tag] = parseInt(killCount);
    });

    return killsByMeans;
  }
}
