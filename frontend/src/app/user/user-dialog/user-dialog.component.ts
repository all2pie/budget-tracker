import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../auth/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
})
export class UserDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UserDialogComponent>);
  readonly data = inject<{ id: string; mode: 'read' | 'update' | 'delete' }>(
    MAT_DIALOG_DATA
  );

  isUpdateMode = this.data.mode === 'update';

  fg: FormGroup;

  constructor(fb: FormBuilder, private service: UserService) {
    this.fg = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      budget: [null, Validators.required],
    });

    if (!this.isUpdateMode) {
      this.fg.disable();
    }
  }

  async ngOnInit() {
    const res = await this.service.getUserProfile(this.data.id);

    if (res) {
      this.fg.patchValue(res);
    }
  }

  close(isDone = false) {
    this.dialogRef.close(isDone);
  }

  async handleAction() {
    let res;

    if (this.isUpdateMode) {
      res = await this.service.updateUserProfile(this.data.id, this.fg.value);
    } else {
      res = await this.service.deleteUser(this.data.id);
    }

    if (res) {
      this.close(true);
    }
  }
}
