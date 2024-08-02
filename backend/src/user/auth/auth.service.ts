import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { seedData } from 'src/common/db/seed-utils';
import { MongoModel } from 'src/common/types/mongoose-model.type';
import { User } from '../user.model';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { getUsersData } from './users.data';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private model: MongoModel<User>,
    private jwt: JwtService,
  ) {
    getUsersData().then((data) => seedData(model, data, 'email'));
  }

  async signUp(data: SignUpDto) {
    const existingUser = await this.model.findOne({ email: data.email });

    if (existingUser)
      throw new BadRequestException('This email is already in use');

    const user = new this.model(data);

    user.password = await argon2.hash(user.password);

    await user.save();

    return {
      success: true,
    };
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.model.findOne({ email });

    if (!user) throw new NotFoundException('Invalid email or password');

    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword)
      throw new NotFoundException('Invalid email or password');

    const payload = {
      email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    return {
      accessToken: this.jwt.sign(payload),
    };
  }
}
