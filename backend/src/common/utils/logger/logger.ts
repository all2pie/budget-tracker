import { Injectable } from '@nestjs/common';
import { NestjsLogger } from './nestjs-logger';

@Injectable()
export class Logger {
  private static logger: NestjsLogger;

  constructor(nestLogger: NestjsLogger) {
    Logger.logger = nestLogger;
  }

  // For NestJS bootstrap logs
  log(message: string, context?: string, data?: any) {
    Logger.logger.info(message, context, data);
  }

  static fatal(message: string, context?: string, data?: any) {
    Logger.logger.fatal(message, context, data);
  }

  static http(message: string, context?: string, data?: any) {
    Logger.logger.http(message, context, data);
  }

  static info(message: string, context?: string, data?: any) {
    Logger.logger.info(message, context, data);
  }

  static debug(message: string, context?: string, data?: any) {
    Logger.logger.debug(message, context, data);
  }

  static error(message: string, context?: string, data?: any) {
    Logger.logger.error(message, context, data);
  }

  static warn(message: string, context?: string, data?: any) {
    Logger.logger.warn(message, context, data);
  }
}
