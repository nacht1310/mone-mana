import { SpendingRecord } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

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

export class QuerySpendingDto {
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    return [];
  })
  categoryIds?: Array<number>;

  @IsOptional()
  @IsNumberString()
  userId?: number;

  @IsOptional()
  @Transform(({ value }) => (value != null ? new Date(+value) : undefined))
  dateStart?: Date;

  @IsOptional()
  @Transform(({ value }) => (value != null ? new Date(+value) : undefined))
  dateEnd?: Date;

  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @IsNotEmpty()
  @Type(() => Number)
  size: number;

  @IsOptional()
  @IsString()
  sortDirection?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  sortField: keyof SpendingRecord;
}

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
