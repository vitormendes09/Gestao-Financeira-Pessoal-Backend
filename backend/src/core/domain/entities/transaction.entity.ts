import { ITransactionEntities } from "src/core/application/interfaces/entities/transaction.entities.interface";

export class Transaction implements ITransactionEntities {
  _id?: string;
  amount: number;
  description: string;
  date: Date;
  type: 'income' | 'expense' | 'fixed-expense';
  recurrenceDay?: number;
  userId: string;

  constructor(
    amount: number,
    description: string,
    date: Date,
    type: 'income' | 'expense' | 'fixed-expense',
    userId: string,
    recurrenceDay?: number
  ) {
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.type = type;
    this.userId = userId;
    this.recurrenceDay = recurrenceDay;
  }
}