import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoModel } from 'src/common/types/mongoose-model.type';
import { User } from '../user.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Role } from 'src/common/types/user-type.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import aqp from 'api-query-params';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private model: MongoModel<User>,
    private eventEmitter: EventEmitter2,
  ) {}

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

  getAllUsers(query) {
    const mongoQuery = aqp(query, { blacklist: ['password'] });

    return this.model.find(
      { role: Role.User, ...mongoQuery.filter },
      { password: 0 },
      {
        sort: mongoQuery.sort,
        limit: mongoQuery.limit,
        skip: mongoQuery.skip,
      },
    );
  }

  async deleteUser(userId: string) {
    await this.model.findByIdAndDelete(userId);
    this.eventEmitter.emit('userDeleted', userId);
    return { success: true };
  }
}
