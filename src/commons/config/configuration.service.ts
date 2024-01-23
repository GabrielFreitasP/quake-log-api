import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

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
}
