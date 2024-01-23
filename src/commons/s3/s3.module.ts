import { Module } from '@nestjs/common';
import { LoggerService } from './bucket.service';
import { ConfigurationModule } from '../config/configuration.module';

@Module({
  imports: [ConfigurationModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
