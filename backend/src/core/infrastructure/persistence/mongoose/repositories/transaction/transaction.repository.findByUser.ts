import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ITransactionRepositoryFindByUser } from 'src/core/application/interfaces/repository/transaction.repository.interface';
import { TransactionModel } from '../../schema/transaction.schema';
import { TransactionQueryDto } from 'src/core/application/dto/transaction/transaction.dto.query';
import { TransactionMapper } from '../../mappers/transaction.mapper';
import { ITransactionEntities } from 'src/core/application/interfaces/entities/transaction.entities.interface';

@Injectable()
export class TransactionRepositoryFindByUser implements ITransactionRepositoryFindByUser {
  constructor(
    @InjectModel(TransactionModel.name)
    private readonly transactionModel: Model<TransactionModel>,
  ) {}

  async findByUser(userId: string, query?: TransactionQueryDto): Promise<ITransactionEntities[]> {
    const filter: any = { userId: new Types.ObjectId(userId) };

    // Filtro por mês e ano
    if (query?.month && query?.year) {
      const startDate = new Date(query.year, query.month - 1, 1);
      const endDate = new Date(query.year, query.month, 0, 23, 59, 59, 999);
      
      filter.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const transactions = await this.transactionModel
      .find(filter)
      .sort({ date: -1 })
      .exec();

    return transactions.map(transaction => TransactionMapper.toDomain(transaction));
  }
}