import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationType } from './notification-type.enum';
import { User } from 'src/common/decorators/user.decorator';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: NotificationType })
  type: NotificationType;

  @Prop({ required: true, default: new Date() })
  date: Date;

  @Prop({ required: true, ref: User.name, type: Types.ObjectId })
  userId: string;

  @Prop({ required: true, default: false })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
