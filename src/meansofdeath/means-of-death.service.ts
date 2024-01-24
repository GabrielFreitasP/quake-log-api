import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeansOfDeath } from './entities/means-of-death.entity';

@Injectable()
export class MeansOfDeathService {
  constructor(
    @InjectRepository(MeansOfDeath)
    private readonly repository: Repository<MeansOfDeath>,
  ) {}
  async save(meansOfDeath: MeansOfDeath) {
    return await this.repository.save(meansOfDeath);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findBy({ id });
  }

  async update(meansOfDeath: MeansOfDeath) {
    return await this.repository.save(meansOfDeath);
  }
}
