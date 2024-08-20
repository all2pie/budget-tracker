import {
  BaseLogger,
  LogLevelColorMap,
  LogLevelKeys,
  LogLevels,
} from './logger.types';
import { createLogger, format, Logger, transports, addColors } from 'winston';

export class WinstonLogger implements BaseLogger {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'db',
      levels: LogLevels,

      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize({ all: true }),
            format.printf((log) => {
              const formattedLog = log.message;

              return formattedLog;
            }),
          ),
        }),
      ],
    });

    addColors(LogLevelColorMap);
  }

  log(level: LogLevelKeys, message: string, data?: any): void {
    this.logger.log(level.toString(), message, data);
  }

  db(message: string, data?: any): void {
    this.log('db', message, data);
  }
  debug(message: string, data?: any): void {
    this.log('debug', message, data);
  }
  error(message: string, data?: any): void {
    this.log('error', message, data);
  }
  warn(message: string, data?: any): void {
    this.log('warn', message, data);
  }
  fatal(message: string, data?: any): void {
    this.log('fatal', message, data);
  }
  info(message: string, data?: any): void {
    this.log('info', message, data);
  }
  http(message: string, data?: any): void {
    this.log('http', message, data);
  }
}
