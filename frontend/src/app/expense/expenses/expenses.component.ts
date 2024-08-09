import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../../common/components/header/header.component';
import { isAdmin, user } from '../../common/state/user.state';
import { Expense } from '../../common/types/expense.interface';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { ExpenseService } from './expense.service';
import { UpdateExpenseComponent } from '../update-expense/update-expense.component';
import { DeleteExpenseComponent } from '../delete-expense/delete-expense.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,
    CommonModule,
  ],
  providers: [ExpenseService],
})
export class ExpensesComponent implements OnInit {
  isAdmin = isAdmin();
  displayedColumns = ['expense', 'expenditure', 'price', 'date', 'actions'];

  expenses: (Expense & { expenditure: number })[] = [];

  constructor(private service: ExpenseService, private dialog: MatDialog) {}

  async ngOnInit() {
    const res = this.isAdmin
      ? await this.service.getAllExpensesForAdmin()
      : await this.service.getAllExpenses();

    if (this.isAdmin) {
      this.displayedColumns[this.displayedColumns.length - 1] = 'user';
    }

    if (res) {
      this.expenses = res.map((expense) => {
        const budget = this.isAdmin
          ? (expense.userId as unknown as { budget: number }).budget
          : user()!.budget;

        const expenditure = Math.round((expense.price / budget) * 100);
        return { ...expense, expenditure };
      });
    }
  }

  openAddExpenseDialogue() {
    this.dialog
      .open(AddExpenseComponent)
      .afterClosed()
      .subscribe((isAdded) => {
        if (isAdded) {
          this.ngOnInit();
        }
      });
  }

  openEditExpenseDialogue(id: string) {
    this.dialog
      .open(UpdateExpenseComponent, {
        data: id,
      })
      .afterClosed()
      .subscribe((isUpdated) => {
        if (isUpdated) {
          this.ngOnInit();
        }
      });
  }

  openDeleteExpenseDialogue(id: string) {
    this.dialog
      .open(DeleteExpenseComponent, {
        data: id,
      })
      .afterClosed()
      .subscribe((isDeleted) => {
        if (isDeleted) {
          this.ngOnInit();
        }
      });
  }
}
