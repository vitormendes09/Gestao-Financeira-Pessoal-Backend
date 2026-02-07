import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionModel } from '../../schema/transaction.schema';
import { ITransactionRepositoryUpdate } from 'src/core/application/interfaces/repository/transaction.repository.interface';
import { ITransactionEntities } from 'src/core/application/interfaces/entities/transaction.entities.interface';
import { TransactionMapper } from '../../mappers/transaction.mapper';

@Injectable()
export class TransactionRepositoryUpdate implements ITransactionRepositoryUpdate {
  constructor(
    @InjectModel(TransactionModel.name)
    private readonly transactionModel: Model<TransactionModel>,
  ) {}

  async update(id: string, transaction: Partial<ITransactionEntities>): Promise<ITransactionEntities> {
    const updateData: any = {};
    
    if (transaction.amount !== undefined) updateData.amount = transaction.amount;
    if (transaction.description !== undefined) updateData.description = transaction.description;
    if (transaction.date !== undefined) updateData.date = transaction.date;
    if (transaction.type !== undefined) updateData.type = transaction.type;
    if (transaction.recurrenceDay !== undefined) updateData.recurrenceDay = transaction.recurrenceDay;
    if (transaction.userId !== undefined) updateData.userId = transaction.userId;

    const updatedTransaction = await this.transactionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedTransaction) {
      throw new Error('Transaction not found');
    }

    return TransactionMapper.toDomain(updatedTransaction);
  }
}