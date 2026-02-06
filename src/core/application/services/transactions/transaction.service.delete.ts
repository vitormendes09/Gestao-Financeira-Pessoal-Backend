import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ITransactionServiceDelete } from '../../interfaces/services/transaction.service';
import { TransactionRepositoryDelete } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.delete';
import { TransactionRepositoryFindById } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.findById';

@Injectable()
export class TransactionServiceDelete implements ITransactionServiceDelete {
  constructor(
    private readonly transactionRepositoryDelete: TransactionRepositoryDelete,
    private readonly transactionRepositoryFindById: TransactionRepositoryFindById,
  ) {}

  async delete(id: string, userId: string) {
    // Verificar se a transação existe e pertence ao usuário
    const existingTransaction = await this.transactionRepositoryFindById.findById(id);
    
    if (!existingTransaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (existingTransaction.userId !== userId) {
      throw new ForbiddenException('You can only delete your own transactions');
    }

    await this.transactionRepositoryDelete.delete(id);
  }
}