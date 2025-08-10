import { IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString } from 'class-validator';

export class CreateSpendingDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  date: number;

  @IsNotEmpty()
  @IsNumberString()
  categoryId: number;
}
