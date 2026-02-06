import { Request } from 'express';
import { BalanceQueryDto } from "../../dto/transaction/transaction.dto.balance";
import { CreateTransactionDto } from "../../dto/transaction/transaction.dto.create";
import { TransactionQueryDto } from "../../dto/transaction/transaction.dto.query";
import { UpdateTransactionDto } from "../../dto/transaction/transaction.dto.update";

export interface ITransactionControllerCreate {
  create(createTransactionDto: CreateTransactionDto, req: Request);
}

export interface ITransactionControllerUpdate {
  update(id: string, updateTransactionDto: UpdateTransactionDto, req: Request);
}

export interface ITransactionControllerFindByUser {
  findByUser(query: TransactionQueryDto, req: Request);
}

export interface ITransactionControllerFindById {
  findById(id: string, req: Request);
}

export interface ITransactionControllerDelete {
  delete(id: string, req: Request);
} 

export interface ITransactionControllerGetBalance {
  getBalance(query: BalanceQueryDto, req: Request);
}