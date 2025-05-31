import { SpendingRecord } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QuerySpendingDto {
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((v) => v.trim());
    return [];
  })
  category?: Array<string>;

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
