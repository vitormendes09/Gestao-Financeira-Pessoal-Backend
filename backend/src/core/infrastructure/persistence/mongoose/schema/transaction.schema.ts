import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class TransactionModel extends Document {
  @Prop({ required: true, min: 0.01 })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ 
    required: true, 
    enum: ['income', 'expense', 'fixed-expense'] 
  })
  type: string;

  @Prop({ min: 1, max: 31 })
  recurrenceDay?: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'UserModel' })
  userId: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionModel);

// Índices para melhor performance
TransactionSchema.index({ userId: 1, date: -1 });
TransactionSchema.index({ userId: 1, type: 1 });
TransactionSchema.index({ userId: 1, recurrenceDay: 1 });