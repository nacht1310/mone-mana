import { SpendingRecord } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  
} from 'class-validator';

export class QuerySpendingDto {
  @IsOptional()
  @IsArray()
  category?: Array<string>;

  @IsOptional()
  @IsNumber()
  dateStart?: number;

  @IsOptional()
  @IsNumber()
  dateEnd?: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsOptional()
  @IsString()
  sortDirection?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  sortField: keyof SpendingRecord;
}
