export interface Expense {
  title: string;

  userId: string;

  price: number;

  date: Date;
}

export interface AddNewExpense
  extends Pick<Expense, 'title' | 'price' | 'date'> {}

export interface UpdateExpense extends Partial<AddNewExpense> {}
