import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { InvalidArgumentException } from '../commons/exceptions/invalid-argument.exception';
import { FileMapper } from './mappers/file.mapper';

import configuration from '../commons/config/configuration';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly repository: Repository<FileEntity>,
    @InjectQueue(configuration().files.queueName)
    private queue: Queue<FileEntity>,
  ) {}

  async create(fileEntity: FileEntity) {
    return this.repository.save(fileEntity);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findOneBy({ id });
  }

  async update(fileEntity: FileEntity) {
    return await this.repository.save(fileEntity);
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new InvalidArgumentException({ file });
    }

    const fileEntity = FileMapper.fileToEntity(file);
    const newFileEntity = await this.create(fileEntity);

    await this.queue.add(configuration().files.jobName, newFileEntity);

    return newFileEntity;
  }
}
