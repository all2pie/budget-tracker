import { User } from 'src/user/user.model';

declare module 'nestjs-cls' {
  interface ClsStore {
    userId: string;
    user: User;

    // Request ID - accessible by using cls.getId()
    CLS_ID: string;
  }
}
