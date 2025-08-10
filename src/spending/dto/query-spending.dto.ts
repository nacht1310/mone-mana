import { SpendingRecord } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

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
