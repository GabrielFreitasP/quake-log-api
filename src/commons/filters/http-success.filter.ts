import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const hostName = require('os').hostname();

@Injectable()
export class HttpSuccessFilter<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const request = context.getArgs()[0];
        const offset = parseInt(request.query.offset || 1);
        const limit = parseInt(request.query.limit || 100);
        let meta = {
          serverName: hostName,
          path: request.url,
          timestamp: new Date().toISOString(),
        };

        if (data?.pageCount) {
          meta = {
            ...meta,
            ...{
              itemCount: data.itemCount,
              limit,
              offset,
            },
          };

          data = data.items;
        }

        return { meta, data };
      }),
    );
  }
}
