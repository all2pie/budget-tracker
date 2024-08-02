import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './expense.model';
import { MongoModel } from 'src/common/types/mongoose-model.type';
import { AddExpenseDto } from './dto/add-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationType } from 'src/notification/notification-type.enum';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private model: MongoModel<Expense>,
    private notificationService: NotificationService,
  ) {}

  get(id: string) {
    return this.model.findById(id).orFail(new NotFoundException('Invalid id'));
  }

  getAll(userId: string) {
    return this.model.find({
      userId,
    });
  }

  async add(data: AddExpenseDto, userId: string) {
    const doc = new this.model({ ...data, userId });

    await doc.save();

    this.notificationService.add({
      userId,
      type: NotificationType.Added,
      title: data.title,
    });

    return doc;
  }

  async update(id: string, data: UpdateExpenseDto) {
    const doc = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });

    this.notificationService.add({
      userId: doc.userId,
      type: NotificationType.Updated,
      title: doc.title,
    });

    return doc;
  }

  async delete(id: string) {
    const doc = await this.model.findByIdAndDelete(id);

    this.notificationService.add({
      userId: doc.userId,
      type: NotificationType.Removed,
      title: doc.title,
    });

    return {
      id: doc.id,
    };
  }
}
