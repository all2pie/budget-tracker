import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/common/decorators/user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/types/user-type.enum';

@ApiBearerAuth()
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private service: ProfileService) {}

  @Get()
  getMyProfile(@UserId() userId: string) {
    return this.service.getProfile(userId);
  }

  @Roles(Role.Admin)
  @Get('allUsers')
  getAllUsers(@Query() query) {
    return this.service.getAllUsers(query);
  }

  @Roles(Role.Admin)
  @Get(':id')
  getUserProfile(@Param('id') userId: string) {
    return this.service.getProfile(userId);
  }

  @Patch()
  updateMyProfile(@Body() data: UpdateProfileDto, @UserId() userId: string) {
    return this.service.updateProfile(userId, data);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  updateUserProfile(
    @Body() data: UpdateProfileDto,
    @Param('id') userId: string,
  ) {
    return this.service.updateProfile(userId, data);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.service.deleteUser(userId);
  }
}
