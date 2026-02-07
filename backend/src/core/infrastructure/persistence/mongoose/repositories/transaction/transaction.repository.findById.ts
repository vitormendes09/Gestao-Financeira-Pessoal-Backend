
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITransactionRepositoryFindById } from 'src/core/application/interfaces/repository/transaction.repository.interface';
import { TransactionModel } from '../../schema/transaction.schema';
import { ITransactionEntities } from 'src/core/application/interfaces/entities/transaction.entities.interface';
import { TransactionMapper } from '../../mappers/transaction.mapper';

@Injectable()
export class TransactionRepositoryFindById implements ITransactionRepositoryFindById {
  constructor(
    @InjectModel(TransactionModel.name)
    private readonly transactionModel: Model<TransactionModel>,
  ) {}

  async findById(id: string): Promise<ITransactionEntities | null> {
    const transactionDocument = await this.transactionModel.findById(id).exec();

    if (!transactionDocument) {
      return null;
    }
    return TransactionMapper.toDomain(transactionDocument);
  }
}