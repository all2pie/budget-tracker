import { Injectable } from '@angular/core';
import { BaseService } from '../../common/services/http-base.service';
import {
  AddNewExpense,
  Expense,
  UpdateExpense,
} from '../../common/types/expense.interface';

@Injectable()
export class ExpenseService extends BaseService {
  override modulePath = 'expense';

  addNewExpense(data: AddNewExpense) {
    return this.post<Expense>('', data);
  }

  updateExpense(data: UpdateExpense, id: string) {
    return this.patch<Expense>(id, data);
  }

  getExpenseDetails(id: string) {
    return this.get<Expense>(id);
  }

  getAllExpenses(queryParams = '') {
    return this.get<{ data: Expense[]; metadata: { total: number } }>(
      '?' + queryParams
    );
  }

  getAllExpensesForAdmin(queryParams = '') {
    return this.get<{ data: Expense[]; metadata: { total: number } }>(
      'allUsersExpenses?' + queryParams
    );
  }

  deleteExpense(id: string) {
    return this.delete<{ id: string }>(id);
  }
}
