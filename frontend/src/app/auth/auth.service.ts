import { Injectable } from '@angular/core';
import { BaseService } from '../common/services/http-base.service';

@Injectable()
export class AuthService extends BaseService {
  override modulePath = 'auth';

  login(data: { email: string; password: string }) {
    return this.post<{ accessToken: string }>('signIn', data);
  }
}
