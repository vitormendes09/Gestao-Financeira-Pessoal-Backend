import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TransactionModel } from '../../schema/transaction.schema';
import { ITransactionRepositoryGetBalance } from 'src/core/application/interfaces/repository/transaction.repository.interface';

@Injectable()
export class TransactionRepositoryGetBalance implements ITransactionRepositoryGetBalance {
  constructor(
    @InjectModel(TransactionModel.name)
    private readonly transactionModel: Model<TransactionModel>,
  ) {}

  async getBalance(userId: string, month: number, year: number): Promise<{
    totalIncome: number;
    totalExpense: number;
    totalFixedExpense: number;
    balance: number;
  }> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    // Buscar transações do mês específico
    const transactions = await this.transactionModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$type',
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    // Buscar despesas fixas que se aplicam a este mês (com base no recurrenceDay)
    const fixedExpenses = await this.transactionModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          type: 'fixed-expense',
          recurrenceDay: { $exists: true, $ne: null },
        },
      },
      {
        $addFields: {
          appliesToMonth: {
            $cond: {
              if: { $lte: ['$recurrenceDay', new Date(endDate).getDate()] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $match: {
          appliesToMonth: true,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    // Inicializar valores
    let totalIncome = 0;
    let totalExpense = 0;
    let totalFixedExpense = fixedExpenses[0]?.totalAmount || 0;

    // Processar resultados
    transactions.forEach(transaction => {
      switch (transaction._id) {
        case 'income':
          totalIncome = transaction.totalAmount;
          break;
        case 'expense':
          totalExpense = transaction.totalAmount;
          break;
      }
    });

    // Calcular saldo
    const balance = totalIncome - totalExpense - totalFixedExpense;

    return {
      totalIncome,
      totalExpense,
      totalFixedExpense,
      balance,
    };
  }
}