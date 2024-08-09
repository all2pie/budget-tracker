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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/budget-tracker', {
      connectionFactory: (conn) => {
        conn.plugin(addIdField);
        conn.plugin(newDocumentOnUpdate);
        return conn;
      },
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
