import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { BullModule } from '@nestjs/bull';
import { FileConsumer } from './file.consumer';
import { KillModule } from '../kill/kill.module';
import { MeansOfDeathModule } from '../meansofdeath/means-of-death.module';
import { PlayerModule } from '../player/player.module';

import configuration from '../commons/config/configuration';
import { LoggerModule } from '../commons/logger/logger.module';
import { PlayerGameModule } from '../playergame/player-game.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      dest: configuration().files.uploadPath,
    }),
    BullModule.registerQueue({
      name: configuration().files.queueName,
    }),
    LoggerModule,
    KillModule,
    MeansOfDeathModule,
    PlayerModule,
    PlayerGameModule,
  ],
  controllers: [FileController],
  providers: [FileService, FileConsumer],
})
export class FileModule {}
