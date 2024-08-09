import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../common/components/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { user } from '../common/state/user.state';
import { User } from '../common/types/user.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../auth/user.service';
import { SnackBarService } from '../common/services/snack-bar.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    ToolbarComponent,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
  ],
})
export class ProfileComponent implements OnInit {
  fg: FormGroup;
  activeTab: 'profile' | 'account' = 'profile';

  user = user() as User;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private snackBar: SnackBarService
  ) {
    this.fg = fb.group({
      firstName: [''],
      lastName: [''],
      budget: [null],
    });

    this.fg.patchValue(this.user);
  }

  ngOnInit() {}

  async handleProfileUpdate() {
    const res = await this.userService.updateProfile(this.fg.value);

    if (res) {
      this.snackBar.open('Profile updated successfully');
      user.set(res);
    }
  }

  handleCancelUpdate() {
    this.fg.patchValue(this.user);
  }
}
