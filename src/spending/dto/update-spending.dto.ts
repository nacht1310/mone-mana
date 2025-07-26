import { IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateSpendingDto {
  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  @IsPositive()
  date?: number;

  @IsString()
  category: string;
}
