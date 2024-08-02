import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './expense.model';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
    NotificationModule,
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
