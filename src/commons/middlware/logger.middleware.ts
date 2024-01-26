import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, _: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    this.logger.log(`[${method}] ${originalUrl}`);
    next();
  }
}
