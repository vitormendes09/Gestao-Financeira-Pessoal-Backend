import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class BalanceQueryDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  month: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  year: number;
}