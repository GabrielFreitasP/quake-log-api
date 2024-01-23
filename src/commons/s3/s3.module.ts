import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigurationModule } from '../config/configuration.module';

@Module({
  imports: [ConfigurationModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
