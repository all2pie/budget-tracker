import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { NotificationModule } from './notification/notification.module';
import { addIdField, newDocumentOnUpdate } from './common/db/mongoose.plugins';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config, config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => config],
      isGlobal: true,
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
export class AppModule {}
