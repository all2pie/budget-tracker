import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/logger/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: Error | any) => void) {
    Logger.http(`${req.method} ${req.originalUrl}`, 'Request started');

    const now = Date.now();

    res.on('finish', () => {
      Logger.http(
        `Status: ${res.statusCode}`,
        `Request ended`,
        `${Date.now() - now}ms`,
      );
    });

    next();
  }
}
