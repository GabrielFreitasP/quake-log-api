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
    return await this.repository.save(player);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findBy({ id });
  }

  async update(player: Player) {
    return await this.repository.save(player);
  }
}
