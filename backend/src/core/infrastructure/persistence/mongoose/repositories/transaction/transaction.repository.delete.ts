
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITransactionRepositoryDelete } from 'src/core/application/interfaces/repository/transaction.repository.interface';
import { TransactionModel } from '../../schema/transaction.schema';

@Injectable()
export class TransactionRepositoryDelete implements ITransactionRepositoryDelete {
  constructor(
    @InjectModel(TransactionModel.name)
    private readonly transactionModel: Model<TransactionModel>,
  ) {}

  async delete(id: string): Promise<void> {
    await this.transactionModel.findByIdAndDelete(id).exec();
  }
}