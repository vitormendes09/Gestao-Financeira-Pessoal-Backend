
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ITransactionRepositoryCreate } from 'src/core/application/interfaces/repository/transaction.repository.interface';
import { TransactionModel } from '../../schema/transaction.schema';
import { ITransactionEntities } from 'src/core/application/interfaces/entities/transaction.entities.interface';
import { TransactionMapper } from '../../mappers/transaction.mapper';

@Injectable()
export class TransactionRepositoryCreate implements ITransactionRepositoryCreate {
  constructor(
    @InjectModel(TransactionModel.name)
    private readonly transactionModel: Model<TransactionModel>,
  ) {}

  async create(transaction: ITransactionEntities): Promise<ITransactionEntities> {
    const transactionDocument = new this.transactionModel({
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
      type: transaction.type,
      recurrenceDay: transaction.recurrenceDay,
      userId: new Types.ObjectId(transaction.userId),
    });
    
    const savedTransaction = await transactionDocument.save();
    return TransactionMapper.toDomain(savedTransaction);
  }
}