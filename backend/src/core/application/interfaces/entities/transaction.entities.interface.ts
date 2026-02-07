export interface ITransactionEntities {
  _id?: string;
  amount: number;
  description: string;
  date: Date;
  type: 'income' | 'expense' | 'fixed-expense';
  recurrenceDay?: number;
  userId: string;
}