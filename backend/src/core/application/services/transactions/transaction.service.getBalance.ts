import { Injectable } from '@nestjs/common';
import { ITransactionServiceGetBalance } from '../../interfaces/services/transaction.service';
import { BalanceQueryDto } from '../../dto/transaction/transaction.dto.balance';
import { TransactionRepositoryGetBalance } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.getBalance';

@Injectable()
export class TransactionServiceGetBalance implements ITransactionServiceGetBalance {
  constructor(
    private readonly transactionRepositoryGetBalance: TransactionRepositoryGetBalance,
  ) {}

  async getBalance(userId: string, query: BalanceQueryDto) {
    const balance = await this.transactionRepositoryGetBalance.getBalance(
      userId,
      query.month,
      query.year
    );
    
    return balance;
  }
}