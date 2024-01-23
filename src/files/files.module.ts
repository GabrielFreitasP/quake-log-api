import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { BullModule } from '@nestjs/bull';
import { FilesConsumer } from './files.consumer';

import configuration from '../commons/config/configuration';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    MulterModule.register({
      dest: configuration().files.uploadPath,
    }),
    BullModule.registerQueue({
      name: configuration().files.queueName,
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService, FilesConsumer],
})
export class FilesModule {}
