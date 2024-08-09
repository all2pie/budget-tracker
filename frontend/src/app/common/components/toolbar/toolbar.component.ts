import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { user } from '../../state/user.state';
import { User } from '../../types/user.interface';
import { UserService } from '../../../auth/user.service';
import { NotificationService } from '../../services/notification.service';
import { Notification, NotificationType } from '../../types/notification.type';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatBadgeModule,
    CommonModule,
  ],
})
export class ToolbarComponent implements OnInit {
  @Input({ required: true })
  mode!: 'full' | 'action';
  @Output()
  buttonClicked = new EventEmitter();

  isProfileOpen = false;
  isNotificationsOpen = false;
  user = user() as User;
  notifications: Notification[] = [];
  unReadNotifications = 0;
  @ViewChild('profileDropdown') profileDropdown!: ElementRef;
  @ViewChild('notificationsDropdown') notificationsDropdown!: ElementRef;

  notificationStyles: {
    [key in NotificationType]: {
      color: string;
      icon: string;
    };
  } = {
    [NotificationType.Added]: {
      color: '#6BB648',
      icon: 'add',
    },
    [NotificationType.Updated]: {
      color: '#2FB6E1',
      icon: 'edit',
    },
    [NotificationType.Removed]: {
      color: '#F04A4A',
      icon: 'close',
    },
  };

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit() {
    const res = await this.notificationService.getAllNotifications();

    if (res) {
      this.notifications = res;
      this.unReadNotifications = res.filter((noti) => !noti.isRead).length;
    }
  }

  toggleProfileDropdown() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  toggleNotificationsDropdown() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  handleLogout() {
    this.userService.handleLogout();
  }

  async readNotification(id: string) {
    await this.notificationService.readNotification(id);
    this.ngOnInit();
  }

  @HostListener('document:click', ['$event'])
  onGlobalClick(event: any): void {
    if (!this.profileDropdown?.nativeElement.contains(event.target)) {
      this.isProfileOpen = false;
    }

    if (!this.notificationsDropdown?.nativeElement.contains(event.target)) {
      this.isNotificationsOpen = false;
    }
  }
}
