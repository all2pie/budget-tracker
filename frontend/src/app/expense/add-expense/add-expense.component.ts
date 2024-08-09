import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExpenseService } from '../expenses/expense.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
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
export class AddExpenseComponent {
  readonly dialogRef = inject(MatDialogRef<AddExpenseComponent>);
  // readonly data = inject<string>(MAT_DIALOG_DATA);

  fg: FormGroup;

  constructor(fb: FormBuilder, private service: ExpenseService) {
    this.fg = fb.group({
      title: ['', Validators.required],
      price: [null, Validators.required],
      date: [null, Validators.required],
    });
  }

  close(isAdded = false) {
    this.dialogRef.close(isAdded);
  }

  async handleAddExpense() {
    const res = await this.service.addNewExpense(this.fg.value);

    if (res) {
      this.close(true);
    }
  }
}
