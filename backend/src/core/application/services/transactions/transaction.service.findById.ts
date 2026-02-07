import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ITransactionServiceFindById } from '../../interfaces/services/transaction.service';
import { TransactionRepositoryFindById } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.findById';

@Injectable()
export class TransactionServiceFindById implements ITransactionServiceFindById {
  constructor(
    private readonly transactionRepositoryFindById: TransactionRepositoryFindById,
  ) {}

  async findById(id: string, userId: string) {
    const transaction = await this.transactionRepositoryFindById.findById(id);
    
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    
    return transaction;
  }
}