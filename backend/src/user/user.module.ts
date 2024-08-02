import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: 'az91asd134j1xa',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController, ProfileController],
  providers: [AuthService, ProfileService],
})
export class UserModule {}
