import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './commons/config/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationService } from './commons/config/configuration.service';
import { LoggerModule } from './commons/logger/logger.module';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { FilesModule } from './files/files.module';

import configuration from './commons/config/configuration';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configurationService: ConfigurationService) => ({
        type: 'postgres' as const,
        host: configurationService.databaseHost,
        port: configurationService.databasePort,
        username: configurationService.databaseUsername,
        password: configurationService.databasePassword,
        database: configurationService.databaseName,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configurationService.databaseSynchronize,
        logging: configurationService.databaseLogging,
        migrations: ['../migrations/*{.ts,.js}'],
        migrationsRun: configurationService.databaseMigrationsRun,
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
