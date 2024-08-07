import { Component, OnInit } from '@angular/core';
import { ExpenseService } from './expense.service';
import { HeaderComponent } from '../common/components/header/header.component';
import { MatTableModule } from '@angular/material/table';
import { Expense } from '../common/types/expense.interface';
import { handleTableConfig } from '../common/utils/handle-table-config';
import { user } from '../common/state/user.state';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    CommonModule,
  ],
  providers: [ExpenseService],
})
export class ExpensesComponent implements OnInit {
  displayedColumns = ['expense', 'expenditure', 'price', 'date', 'actions'];

  expenses: (Expense & { expenditure: number })[] = [];
  budget = user()!.budget;

  constructor(private service: ExpenseService) {}

  async ngOnInit() {
    const res = await this.service.getAllExpenses();

    if (res) {
      this.expenses = res.map((expense) => {
        const expenditure = Math.round((expense.price / this.budget) * 100);
        return { ...expense, expenditure };
      });
    }
  }

  openAddExpenseDialogue() {}
}
