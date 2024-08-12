import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './expense.model';
import { MongoModel } from 'src/common/types/mongoose-model.type';
import { AddExpenseDto } from './dto/add-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationType } from 'src/notification/notification-type.enum';
import aqp from 'api-query-params';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private model: MongoModel<Expense>,
    private notificationService: NotificationService,
  ) {}

  get(id: string) {
    return this.model.findById(id).orFail(new NotFoundException('Invalid id'));
  }

  async getAll(query, userId?: string) {
    const mongoQuery = aqp(query);

    const conditions = mongoQuery.filter;

    if (userId) conditions['userId'] = userId;

    const dbQuery = this.model.find(conditions, null, {
      sort: mongoQuery.sort,
      limit: mongoQuery.limit,
      skip: mongoQuery.skip,
    });

    if (!userId) {
      dbQuery.populate('userId');
    }

    const total = await dbQuery.clone().skip(0).limit(null).countDocuments();
    const res = await dbQuery;

    return {
      data: res,
      metadata: {
        total,
      },
    };
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

  @OnEvent('userDeleted')
  handleUserDeleted(userId: string) {
    this.model
      .deleteMany({
        userId,
      })
      .exec();
  }
}
