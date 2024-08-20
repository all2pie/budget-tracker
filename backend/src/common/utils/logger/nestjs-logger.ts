import { Inject, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { WinstonLogger } from './winston-logger';
import { BaseLogger, LogLevelKeys } from './logger.types';

@Injectable()
export class NestjsLogger implements BaseLogger {
  constructor(
    @Inject(WinstonLogger) private logger: BaseLogger,
    private cls: ClsService,
  ) {}

  handleLog(
    level: LogLevelKeys,
    message: string,
    context?: string,
    data?: any,
  ) {
    const logData = this.addContext({ data });
    let formattedMessage = message;

    if (context) {
      formattedMessage = `[${context}] - ` + formattedMessage;
      logData['context'] = context;
    }

    if (logData.requestId)
      formattedMessage = `(${logData.requestId}) - ` + formattedMessage;

    formattedMessage = `${logData.timestamp} - ${formattedMessage}`;

    if (data) {
      if (typeof data !== 'string') {
        data = JSON.stringify(data, null, 2);
      }

      formattedMessage += `: ${data}`;
    }

    this.logger[level](formattedMessage, data);
  }

  fatal(message: string, context?: string, data?: any) {
    this.handleLog('fatal', message, context, data);
  }
  http(message: string, context?: string, data?: any) {
    this.handleLog('http', message, context, data);
  }
  info(message: string, context?: string, data?: any) {
    this.handleLog('info', message, context, data);
  }
  debug(message: string, context?: string, data?: any) {
    this.handleLog('debug', message, context, data);
  }
  db(message: string, context?: string, data?: any) {
    this.handleLog('db', message, context, data);
  }
  error(message: string, context?: string, data?: any) {
    this.handleLog('error', message, context, data);
  }
  warn(message: string, context?: string, data?: any) {
    this.handleLog('warn', message, context, data);
  }

  addContext(data = {}) {
    const timestamp = new Date().toLocaleString();

    return {
      ...data,
      timestamp,
      requestId: this.cls.getId(),
    };
  }
}
