import { BalanceQueryDto } from "../../dto/transaction/transaction.dto.balance";
import { CreateTransactionDto } from "../../dto/transaction/transaction.dto.create";
import { TransactionQueryDto } from "../../dto/transaction/transaction.dto.query";
import { UpdateTransactionDto } from "../../dto/transaction/transaction.dto.update";

export interface ITransactionServiceCreate {
  create(createTransactionDto: CreateTransactionDto, userId: string);
}

export interface ITransactionServiceUpdate {
  update(id: string, updateTransactionDto: UpdateTransactionDto, userId: string);
}

export interface ITransactionServiceFindByUser {
  findByUser(userId: string, query: TransactionQueryDto);
}

export interface ITransactionServiceFindById {
  findById(id: string, userId: string);
}

export interface ITransactionServiceDelete {
  delete(id: string, userId: string);
}

export interface ITransactionServiceGetBalance {
  getBalance(userId: string, query: BalanceQueryDto);
}