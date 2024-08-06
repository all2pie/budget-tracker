import { Injectable } from '@angular/core';
import { BaseService } from '../common/services/http-base.service';
import { User } from '../common/types/user.interface';
import { user } from '../common/state/user.state';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  override modulePath = 'profile';

  constructor(private router: Router) {
    super();

    this.setUserProfile();
  }

  async setUserProfile() {
    const profile = await this.getProfile();

    if (profile) {
      user.set(profile);
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  handleLogout() {
    user.set(null);
    this.router.navigate(['/auth/login']);
  }

  getProfile() {
    return this.get<User>('');
  }
}
