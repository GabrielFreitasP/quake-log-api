import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { DataSourceOptions } from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './commons/config/configuration.module';
import { LoggerModule } from './commons/logger/logger.module';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { FilesModule } from './files/files.module';
import { ConfigurationService } from './commons/config/configuration.service';

import configuration from './commons/config/configuration';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot(DataSourceOptions),
    ConfigurationModule,
    BullModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configurationService: ConfigurationService) => ({
        redis: {
          host: configurationService.redisHost,
          port: configurationService.redisPort,
          password: configurationService.redisPassword,
        },
      }),
      inject: [ConfigurationService],
    }),
    LoggerModule,
    GameModule,
    PlayerModule,
    FilesModule,
  ],
})
export class AppModule {}
