import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kill } from './entities/kill.entity';

@Injectable()
export class KillService {
  constructor(
    @InjectRepository(Kill)
    private readonly repository: Repository<Kill>,
  ) {}
  async save(kill: Kill) {
    return await this.repository.save(kill);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findBy({ id });
  }

  async update(kill: Kill) {
    return await this.repository.save(kill);
  }
}
