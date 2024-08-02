import { OmitType } from '@nestjs/swagger';
import { Expense } from '../expense.model';

export class AddExpenseDto extends OmitType(Expense, ['userId']) {}
