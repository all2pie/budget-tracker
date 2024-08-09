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
  selector: 'app-delete-expense',
  templateUrl: './delete-expense.component.html',
  styleUrls: ['./delete-expense.component.scss'],
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
export class DeleteExpenseComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DeleteExpenseComponent>);
  readonly id = inject<string>(MAT_DIALOG_DATA);

  fg: FormGroup;

  constructor(fb: FormBuilder, private service: ExpenseService) {
    this.fg = fb.group({
      title: ['', Validators.required],
      price: [null, Validators.required],
      date: [null, Validators.required],
    });

    this.fg.disable();
  }

  async ngOnInit() {
    const res = await this.service.getExpenseDetails(this.id);

    if (res) {
      this.fg.patchValue(res);
    }
  }

  close(isDeleted = false) {
    this.dialogRef.close(isDeleted);
  }

  async handleDeleteExpense() {
    const res = await this.service.deleteExpense(this.id);

    if (res) {
      this.close(true);
    }
  }
}
