import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly repository: Repository<Player>,
  ) {}
  async save(player: Player) {
    await this.repository.save(player);
  }

  async findAll() {
    await this.repository.find();
  }

  async findOne(id: string) {
    await this.repository.findBy({ id });
  }

  async update(player: Player) {
    await this.repository.save(player);
  }
}
