import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { InvalidArgumentException } from '../commons/exceptions/invalid-argument.exception';
import { FileMapper } from './mappers/file.mapper';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly filesRepository: Repository<FileEntity>,
  ) {}

  uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new InvalidArgumentException({ file });
    }

    const newFile = FileMapper.fileToEntity(file);
    return this.create(newFile);
  }

  async create(fileEntity: FileEntity) {
    return this.filesRepository.create(fileEntity);
  }

  async findAll() {
    return await this.filesRepository.find();
  }

  async findOne(id: string) {
    return await this.filesRepository.findOneBy({ id });
  }

  async update(fileEntity: FileEntity) {
    return await this.filesRepository.save(fileEntity);
  }
}
