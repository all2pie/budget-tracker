import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoModel } from 'src/common/types/mongoose-model.type';
import { Notification } from './notification.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private model: MongoModel<Notification>,
  ) {}

  getAll(userId: string) {
    return this.model.find({
      userId,
    });
  }

  async add(data: Omit<Notification, 'date' | 'isRead'>) {
    const doc = new this.model(data);

    await doc.save();

    return doc;
  }

  async readNotification(id: string, userId: string) {
    await this.model.findOneAndUpdate(
      { _id: id, userId },
      { isRead: true },
      {
        new: true,
      },
    );

    return { success: true };
  }
}
