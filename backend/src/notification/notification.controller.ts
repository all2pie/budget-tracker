import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/common/decorators/user.decorator';
import { NotificationService } from './notification.service';

@ApiBearerAuth()
@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private service: NotificationService) {}

  @Get()
  getAll(@UserId() userId: string) {
    return this.service.getAll(userId);
  }

  @Patch('view/:id')
  readNotification(@UserId() userId: string, @Param('id') id: string) {
    return this.service.readNotification(id, userId);
  }
}
