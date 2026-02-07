import { ITransactionEntities } from "src/core/application/interfaces/entities/transaction.entities.interface";
import { TransactionModel } from "../schema/transaction.schema";
import { Types } from 'mongoose';

export class TransactionMapper {
  static toDomain(transactionModel: TransactionModel): ITransactionEntities {
    return {
      _id: transactionModel._id.toString(),
      amount: transactionModel.amount,
      description: transactionModel.description,
      date: transactionModel.date,
      type: transactionModel.type as 'income' | 'expense' | 'fixed-expense',
      recurrenceDay: transactionModel.recurrenceDay,
      userId: transactionModel.userId.toString(),
    };
  }

  static toPersistence(transaction: ITransactionEntities): TransactionModel {
    const transactionModel = new TransactionModel();
    
    transactionModel.amount = transaction.amount;
    transactionModel.description = transaction.description;
    transactionModel.date = transaction.date;
    transactionModel.type = transaction.type;
    transactionModel.recurrenceDay = transaction.recurrenceDay;
    
    if (transaction.userId) {
      transactionModel.userId = new Types.ObjectId(transaction.userId);
    }
    
    if (transaction._id) {
      transactionModel._id = new Types.ObjectId(transaction._id);
    }
    
    return transactionModel;
  }
}