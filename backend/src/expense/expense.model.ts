import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDateString, IsNumber, IsString, Length, Min } from 'class-validator';
import { Types } from 'mongoose';
import { schemaNames } from 'src/common/db/mongoose.logging';
import { User } from 'src/user/user.model';

@Schema({ timestamps: true })
export class Expense {
  @IsString()
  @Length(1, 30)
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, ref: User.name, type: Types.ObjectId })
  userId: string;

  @IsNumber()
  @Min(1)
  @Prop({ required: true })
  price: number;

  @IsDateString()
  @Prop({ required: true })
  date: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
schemaNames.set(ExpenseSchema, Expense.name);
