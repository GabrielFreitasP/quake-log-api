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

  get databaseMigrationsRun(): boolean {
    return Boolean(this.configService.get('database.migrationsRun'));
  }

  get redisHost(): string {
    return this.configService.get('redis.host');
  }

  get redisPort(): number {
    return parseInt(this.configService.get('redis.port'));
  }

  get redisPassword(): string {
    return this.configService.get('redis.password');
  }

  get loggerLevel(): string {
    return this.configService.get('logger.level');
  }

  get loggerLabel(): string {
    return this.configService.get('logger.label');
  }

  get authJwtSecret(): string {
    return this.configService.get('auth.jwt.secret');
  }

  get authJwtExpiresIn(): string {
    return this.configService.get('auth.jwt.expiresIn');
  }
}
