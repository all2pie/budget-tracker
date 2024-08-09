import { Injectable } from '@angular/core';
import { BaseService } from '../../common/services/http-base.service';
import { Notification } from '../types/notification.type';

@Injectable({ providedIn: 'root' })
export class NotificationService extends BaseService {
  override modulePath = 'notification';

  getAllNotifications() {
    return this.get<Notification[]>('');
  }

  readNotification(id: string) {
    return this.patch('view/' + id, {});
  }
}
