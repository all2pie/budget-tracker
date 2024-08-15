import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { HeaderComponent } from '../../common/components/header/header.component';
import { isAdmin, user } from '../../common/state/user.state';
import { Expense } from '../../common/types/expense.interface';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { DeleteExpenseComponent } from '../delete-expense/delete-expense.component';
import { UpdateExpenseComponent } from '../update-expense/update-expense.component';
import { ExpenseService } from './expense.service';

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
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [ExpenseService],
})
export class ExpensesComponent implements OnInit, AfterViewInit {
  fg: FormGroup;
  isAdmin = isAdmin;
  displayedColumns = ['expense', 'expenditure', 'price', 'date', 'actions'];
  sortOptions = {
    '-price': 'Price: Highest to lowest',
    price: 'Price: Lowest to highest',
    '-date': 'Date: Highest to lowest',
    date: 'Date: Lowest to highest',
  };

  dataSource = new MatTableDataSource<Expense & { expenditure: number }>();
  total = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ExpenseService,
    private dialog: MatDialog,
    fb: FormBuilder
  ) {
    this.fg = fb.group({
      search: [''],
      sort: [''],
      date: [],
    });

    this.fg.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(
          (previous, current) =>
            JSON.stringify(current) === JSON.stringify(previous)
        )
      )
      .subscribe(() => {
        this.loadData();
      });

    if (this.isAdmin()) {
      this.displayedColumns[this.displayedColumns.length - 1] = 'user';
    }
  }
  ngAfterViewInit() {}

  async ngOnInit() {
    await this.loadData();
  }

  buildQueryParams(params = new URLSearchParams()) {
    const pageSize = this.paginator?.pageSize || 10;
    const pageNumber = this.paginator?.pageIndex || 0;

    params.append('limit', pageSize.toString());
    params.append('skip', (pageNumber * pageSize).toString());

    const { search, sort, date } = this.fg.value;

    if (search) {
      params.append('title', `/${search}/i`);
    }

    if (sort) {
      params.append('sort', sort);
    }

    if (date) {
      params.append('date', date);
    }

    return params;
  }

  async loadData() {
    const queryParams = this.buildQueryParams().toString();

    const res = this.isAdmin()
      ? await this.service.getAllExpensesForAdmin(queryParams)
      : await this.service.getAllExpenses(queryParams);

    if (res) {
      this.total = res.metadata.total;
      this.dataSource.data = res.data.map((expense) => {
        const budget = this.isAdmin()
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
