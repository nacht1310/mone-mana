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
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  date: number;

  @IsNotEmpty()
  @IsNumber()
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

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  date?: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
