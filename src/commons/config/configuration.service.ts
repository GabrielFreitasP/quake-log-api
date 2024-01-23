import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return parseInt(this.configService.get('port'));
  }

  get databaseHost(): string {
    return this.configService.get('database.host');
  }

  get databasePort(): number {
    return parseInt(this.configService.get('database.port'));
  }

  get databaseUsername(): string {
    return this.configService.get('database.username');
  }

  get databasePassword(): string {
    return this.configService.get('database.password');
  }

  get databaseName(): string {
    return this.configService.get('database.name');
  }

  get databaseSynchronize(): boolean {
    return Boolean(this.configService.get('database.synchronize'));
  }

  get databaseLogging(): boolean {
    return Boolean(this.configService.get('database.logging'));
  }

  get loggerLevel(): string {
    return this.configService.get('logger.level');
  }

  get loggerLabel(): string {
    return this.configService.get('logger.label');
  }

  get s3Host(): string {
    return this.configService.get('s3.host');
  }
  get s3Port(): number {
    return parseInt(this.configService.get('s3.port'));
  }
  get s3AccessKeyId(): string {
    return this.configService.get('s3.accessKeyId');
  }
  get s3SecretAccessKey(): string {
    return this.configService.get('s3.secretAccessKey');
  }
  get s3ForcePathStyle(): boolean {
    return Boolean(this.configService.get('s3.forcePathStyle'));
  }
  get s3SignatureVersion(): string {
    return this.configService.get('s3.signatureVersion');
  }
}
