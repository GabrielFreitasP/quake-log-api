import { Injectable } from '@nestjs/common';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly repository: Repository<Game>,
  ) {}

  async save(game: Game) {
    await this.repository.save(game);
  }

  async findAll() {
    await this.repository.find();
  }

  async findOne(id: string) {
    await this.repository.findBy({ id });
  }

  async update(game: Game) {
    await this.repository.save(game);
  }
}
