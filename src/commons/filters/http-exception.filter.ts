import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hostName = require('os').hostname();

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse() as HttpException;
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      meta: {
        serverName: hostName,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
      data: {
        message: exceptionResponse.message,
      },
    });
  }
}
