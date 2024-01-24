import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { BullModule } from '@nestjs/bull';
import { FileConsumer } from './file.consumer';

import configuration from '../commons/config/configuration';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      dest: configuration().files.uploadPath,
    }),
    BullModule.registerQueue({
      name: configuration().files.queueName,
    }),
  ],
  controllers: [FileController],
  providers: [FileService, FileConsumer],
})
export class FileModule {}