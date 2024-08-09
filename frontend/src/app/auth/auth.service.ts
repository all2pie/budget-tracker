import { Injectable } from '@angular/core';
import { BaseService } from '../common/services/http-base.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  override modulePath = 'auth';

  login(data: { email: string; password: string }) {
    return this.post<{ accessToken: string }>('signIn', data);
  }

  signUp(data: {
    email: string;
    password: string;
    budget: number;
    firstName: string;
    lastName: string;
  }) {
    return this.post<{ success: boolean }>('signUp', data);
  }

  logout() {
    return this.get('logout');
  }
}
