import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../common/types/user-type.enum';
import { IsEmail, IsNumber, IsString, Length, Max, Min } from 'class-validator';

@Schema({ timestamps: true })
export class User {
  @IsString()
  @Length(1, 50)
  @Prop({ required: true })
  firstName: string;

  @IsString()
  @Length(1, 50)
  @Prop({ required: true })
  lastName: string;

  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @IsString()
  @Length(8)
  @Prop({ required: true })
  password: string;

  @IsNumber()
  @Min(1)
  @Max(99999999)
  @Prop({ required: true })
  budget: number;

  @Prop({ required: true, enum: Role, default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
