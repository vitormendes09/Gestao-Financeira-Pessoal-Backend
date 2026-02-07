import { IsEnum, IsNumber, IsOptional, IsString, IsDate, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTransactionDto {
  @IsNumber()
  @IsOptional()
  @Min(0.01)
  amount?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date;

  @IsEnum(['income', 'expense', 'fixed-expense'])
  @IsOptional()
  type?: 'income' | 'expense' | 'fixed-expense';

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(31)
  recurrenceDay?: number;
}