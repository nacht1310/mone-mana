import { SpendingRecord } from "@prisma/client";

export interface QuerySpendingDto {
  category?: Array<string>;
  date?: number;
  page: number;
  size: number;
  sortDirection: 'asc' | 'desc';
  sortField: keyof SpendingRecord;
}
