import { Injectable } from '@nestjs/common';
import { ITransactionServiceFindByUser } from '../../interfaces/services/transaction.service';
import { TransactionRepositoryFindByUser } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.findByUser';
import { TransactionQueryDto } from '../../dto/transaction/transaction.dto.query';

@Injectable()
export class TransactionServiceFindByUser implements ITransactionServiceFindByUser {
  constructor(
    private readonly transactionRepositoryFindByUser: TransactionRepositoryFindByUser,
  ) {}

  async findByUser(userId: string, query: TransactionQueryDto) {
    const transactions = await this.transactionRepositoryFindByUser.findByUser(userId, query);
    
    return transactions;
  }
}