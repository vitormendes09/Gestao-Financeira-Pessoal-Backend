import { IsEnum, IsNumber, IsOptional, IsString, IsDate, IsNotEmpty, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;

  @IsEnum(['income', 'expense', 'fixed-expense'])
  @IsNotEmpty()
  type: 'income' | 'expense' | 'fixed-expense';

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(31)
  recurrenceDay?: number;

}