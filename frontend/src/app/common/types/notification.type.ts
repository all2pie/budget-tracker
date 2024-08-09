export interface Notification {
  id: string;

  title: string;

  type: NotificationType;

  date: Date;

  userId: string;

  isRead: boolean;
}

export enum NotificationType {
  Added = 'Added',
  Updated = 'Updated',
  Removed = 'Removed',
}
