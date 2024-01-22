import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './commons/config/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationService } from './commons/config/configuration.service';
import { LoggerModule } from './commons/logger/logger.module';

import configuration from './commons/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configurationService: ConfigurationService) => ({
        type: 'mysql' as const,
        host: configurationService.databaseHost,
        port: configurationService.databasePort,
        username: configurationService.databaseUsername,
        password: configurationService.databasePassword,
        database: configurationService.databaseName,
        entities: [__dirname + '/**/*.entity.js'],
        synchronize: configurationService.databaseSynchronize,
        logging: configurationService.databaseLogging,
      }),
      inject: [ConfigurationService],
    }),
    LoggerModule,
  ],
})
export class AppModule { }
