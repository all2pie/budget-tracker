import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { ClsMiddleware, ClsModule } from 'nestjs-cls';
import { AppController } from './app.controller';
import { addIdField, newDocumentOnUpdate } from './common/db/mongoose.plugins';
import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { LoggerModule } from './common/utils/logger/logger.module';
import { Config, config } from './config';
import { ExpenseModule } from './expense/expense.module';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './common/middleware/logging.middleware';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => config],
      isGlobal: true,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) =>
          (req.headers['X-Request-Id'] as string) ?? randomUUID().toString(),
      },
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService<Config>) => ({
        uri: configService.get('mongoDbUri', { infer: true }),
        connectionFactory: (conn) => {
          conn.plugin(addIdField);
          conn.plugin(newDocumentOnUpdate);
          return conn;
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ExpenseModule,
    NotificationModule,
    EventEmitterModule.forRoot({
      ignoreErrors: false,
    }),
    LoggerModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
