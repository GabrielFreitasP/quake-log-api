import { Injectable, NotFoundException } from '@nestjs/common';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        'killFeed',
        'killFeed.killer',
        'killFeed.victim',
        'killFeed.meansOfDeath',
      ],
    });

    if (games.length === 0) {
      throw new NotFoundException(Game, 'game not found');
    }

    return games[0].killFeed.map((kill) => kill.toText());
  }
}
