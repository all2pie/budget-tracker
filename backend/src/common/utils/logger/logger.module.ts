import { Module } from '@nestjs/common';
import { WinstonLogger } from './winston-logger';
import { NestjsLogger } from './nestjs-logger';
import { Logger } from './logger';

@Module({
  providers: [WinstonLogger, NestjsLogger, Logger],
  exports: [Logger],
})
export class LoggerModule {}
