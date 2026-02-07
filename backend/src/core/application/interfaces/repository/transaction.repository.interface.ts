
import { TransactionQueryDto } from "../../dto/transaction/transaction.dto.query";
import { ITransactionEntities } from "../entities/transaction.entities.interface";

export interface ITransactionRepositoryCreate {
  create(transaction: ITransactionEntities): Promise<ITransactionEntities>;
}

export interface ITransactionRepositoryUpdate {
  update(id: string, transaction: Partial<ITransactionEntities>): Promise<ITransactionEntities>;
}

export interface ITransactionRepositoryFindById {
  findById(id: string): Promise<ITransactionEntities | null>;
}

export interface ITransactionRepositoryFindByUser {
  findByUser(userId: string, query?: TransactionQueryDto): Promise<ITransactionEntities[]>;
}

export interface ITransactionRepositoryDelete {
  delete(id: string): Promise<void>;
}

export interface ITransactionRepositoryGetBalance {
  getBalance(userId: string, month: number, year: number): Promise<{
    totalIncome: number;
    totalExpense: number;
    totalFixedExpense: number;
    balance: number;
  }>;
}