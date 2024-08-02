import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoModel } from 'src/common/types/mongoose-model.type';
import { User } from '../user.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Role } from 'src/common/types/user-type.enum';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private model: MongoModel<User>) {}

  async getProfile(id: string) {
    return this.model
      .findById(id, { password: 0 })
      .orFail(new NotFoundException());
  }

  async updateProfile(id: string, data: UpdateProfileDto) {
    await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });

    return {
      success: true,
    };
  }

  getAllUsers() {
    return this.model.find({ role: Role.User }, { password: 0 });
  }
}
