import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class TransactionQueryDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  month?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  year?: number;

  @IsString()
  @IsOptional()
  userId?: string;
} 