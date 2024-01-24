import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { InvalidArgumentException } from '../commons/exceptions/invalid-argument.exception';
import { FileMapper } from './mappers/file.mapper';

import configuration from '../commons/config/configuration';
import { FileReader } from '../commons/readers/file.reader';
import { FileStatusEnum } from './enums/file-status.enum';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly repository: Repository<File>,
    @InjectQueue(configuration().files.queueName)
    private queue: Queue<File>,
  ) {}

  async create(fileEntity: File) {
    return this.repository.save(fileEntity);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findOneBy({ id });
  }

  async update(fileEntity: File) {
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

  async processFile(file: File) {
    file.status = FileStatusEnum.Processing;
    await this.update(file);

    const lines = FileReader.readFileLines(file.path);
    lines.forEach(() => {
      // TODO save games and players
    });
  }
}
