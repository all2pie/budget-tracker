import { Injectable } from '@angular/core';
import { BaseService } from '../common/services/http-base.service';
import { User } from '../common/types/user.interface';
import { user } from '../common/state/user.state';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  override modulePath = 'profile';

  constructor(private router: Router, private authService: AuthService) {
    super();
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

  async handleLogout() {
    await this.authService.logout();
    user.set(null);
    this.router.navigate(['/auth/login']);
  }

  getProfile() {
    return this.get<User>('', { showError: false });
  }

  getUserProfile(id: string) {
    return this.get<User>(id);
  }

  getAllUsers() {
    return this.get<User[]>('allUsers');
  }

  updateUserProfile(id: string, data: Partial<User>) {
    return this.patch<User>(id, data);
  }

  updateProfile(data: Partial<User>) {
    return this.patch<User>('', data);
  }

  deleteUser(id: string) {
    return this.delete(id);
  }
}
