import { Injectable, ForbiddenException } from '@nestjs/common';
import { ITransactionServiceCreate } from '../../interfaces/services/transaction.service';
import { TransactionRepositoryCreate } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.create'; // Importe a classe concreta
import { CreateTransactionDto } from '../../dto/transaction/transaction.dto.create';

@Injectable()
export class TransactionServiceCreate implements ITransactionServiceCreate {
  constructor(
    private readonly transactionRepositoryCreate: TransactionRepositoryCreate, // Use a classe concreta
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    // Validar se é uma despesa fixa tem recurrenceDay
    if (createTransactionDto.type === 'fixed-expense' && !createTransactionDto.recurrenceDay) {
      throw new Error('Fixed expenses must have a recurrenceDay');
    }

    const transaction = await this.transactionRepositoryCreate.create({
      ...createTransactionDto,
      userId,
    });

    return transaction;
  }
} 