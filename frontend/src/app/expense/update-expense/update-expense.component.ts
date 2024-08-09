import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExpenseService } from '../expenses/expense.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [ExpenseService],
})
export class UpdateExpenseComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UpdateExpenseComponent>);
  readonly id = inject<string>(MAT_DIALOG_DATA);

  fg: FormGroup;

  constructor(fb: FormBuilder, private service: ExpenseService) {
    this.fg = fb.group({
      title: ['', Validators.required],
      price: [null, Validators.required],
      date: [null, Validators.required],
    });
  }

  async ngOnInit() {
    const res = await this.service.getExpenseDetails(this.id);

    if (res) {
      this.fg.patchValue(res);
    }
  }

  close(isUpdated = false) {
    this.dialogRef.close(isUpdated);
  }

  async handleUpdateExpense() {
    const res = await this.service.updateExpense(this.fg.value, this.id);

    if (res) {
      this.close(true);
    }
  }
}
