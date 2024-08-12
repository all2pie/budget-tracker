import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ExpenseService } from '../expense/expenses/expense.service';
import { HeaderComponent } from '../common/components/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { isAdmin } from '../common/state/user.state';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  standalone: true,
  imports: [
    NgxChartsModule,
    HeaderComponent,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [ExpenseService],
})
export class AnalysisComponent implements OnInit {
  data = [
    {
      name: 'Expense',
      series: [] as { name: Date; value: number }[],
    },
  ];

  constructor(private service: ExpenseService) {}

  async ngOnInit(queryParams = '') {
    const res = isAdmin()
      ? await this.service.getAllExpensesForAdmin(queryParams)
      : await this.service.getAllExpenses(queryParams);

    if (res) {
      this.data[0].series = res.data.map((expense) => ({
        name: new Date(expense.date),
        value: expense.price,
      }));

      this.data = [...this.data];
    }
  }

  dateRangeChanged(monthsStr: string) {
    const months = parseInt(monthsStr);
    const pastMonths = new Date();
    pastMonths.setMonth(pastMonths.getMonth() - months);

    this.ngOnInit(`date>=${pastMonths.toISOString()}`);
  }
}
