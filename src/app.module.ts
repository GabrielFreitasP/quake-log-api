import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './commons/config/configuration.module';
import { LoggerModule } from './commons/logger/logger.module';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigurationService } from './commons/config/configuration.service';

import configuration from './commons/config/configuration';
import { LoggerMiddleware } from './commons/middlware/logger.middleware';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configurationService: ConfigurationService) => ({
        type: 'postgres' as const,
        host: configurationService.databaseHost,
        port: configurationService.databasePort,
        username: configurationService.databaseUsername,
        password: configurationService.databasePassword,
        database: configurationService.databaseName,
        entities: [__dirname + '/**/*.entity.js'],
        synchronize: configurationService.databaseSynchronize,
        logging: configurationService.databaseLogging,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigurationService],
    }),
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
    UserModule,
    AuthModule,
    LoggerModule,
    GameModule,
    PlayerModule,
    FileModule,
  ],
})
export class AppModule {
  // noinspection JSUnusedGlobalSymbols
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
