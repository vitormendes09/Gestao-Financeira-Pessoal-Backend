import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ITransactionServiceUpdate } from '../../interfaces/services/transaction.service';
import { TransactionRepositoryUpdate } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.update';
import { TransactionRepositoryFindById } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.findById';
import { UpdateTransactionDto } from '../../dto/transaction/transaction.dto.update';

@Injectable()
export class TransactionServiceUpdate implements ITransactionServiceUpdate {
  constructor(
    private readonly transactionRepositoryUpdate: TransactionRepositoryUpdate,
    private readonly transactionRepositoryFindById: TransactionRepositoryFindById,
  ) {}

  async update(id: string, updateTransactionDto: UpdateTransactionDto, userId: string) {
    // Verificar se a transação existe e pertence ao usuário
    const existingTransaction = await this.transactionRepositoryFindById.findById(id);
    
    if (!existingTransaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (existingTransaction.userId !== userId) {
      throw new ForbiddenException('You can only update your own transactions');
    }

    const updatedTransaction = await this.transactionRepositoryUpdate.update(id, updateTransactionDto);
    
    return updatedTransaction;
  }
}