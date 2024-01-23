import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './commons/config/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './commons/logger/logger.module';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { FilesModule } from './files/files.module';
import { DataSourceOptions } from '../ormconfig';

import configuration from './commons/config/configuration';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => DataSourceOptions,
    }),
    LoggerModule,
    GameModule,
    PlayerModule,
    FilesModule,
  ],
})
export class AppModule {}
