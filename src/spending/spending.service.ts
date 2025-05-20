import { Injectable } from '@nestjs/common';
import { CreateSpendingDto } from './dto/create-spending.dto';
import { UpdateSpendingDto } from './dto/update-spending.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuerySpendingDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpendingService {
  constructor(private prisma: PrismaService) {}

  create(createSpendingDto: CreateSpendingDto, userId: number) {
    const spending = this.prisma.spendingRecord.create({
      data: {
        ...createSpendingDto,
        date: new Date(createSpendingDto.date),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return spending;
  }

  findAll(
    queryParams: QuerySpendingDto = {
      page: 0,
      size: 10,
      sortDirection: 'desc',
      sortField: 'date',
    },
  ) {
    const { page, size, sortDirection, sortField, ...filter } = queryParams;
    const spendingList = this.prisma.spendingRecord.findMany({
      skip: size * page,
      take: size,
      orderBy: [{ [sortField ?? 'date']: sortDirection ?? 'desc' }],
      where: {
        category: {
          in: filter.category ? filter.category : Prisma.skip,
        },
        AND: [
          {
            date: {
              gte: filter.dateStart ? new Date(filter.dateStart) : Prisma.skip,
            },
          },
          {
            date: {
              lte: filter.dateEnd ? new Date(filter.dateEnd) : Prisma.skip,
            },
          },
        ],
      },
    });
    return spendingList;
  }

  findOne(id: number) {
    const spending = this.prisma.spendingRecord.findUnique({
      where: {
        id,
      },
    });

    if (!spending) {
      throw new Error('Spending not found');
    }

    return spending;
  }

  update(id: number, updateSpendingDto: UpdateSpendingDto) {
    const spending = this.prisma.spendingRecord.update({
      where: {
        id,
      },
      data: {
        ...updateSpendingDto,
        date: updateSpendingDto.date
          ? new Date(updateSpendingDto.date)
          : Prisma.skip,
      },
    });

    if (!spending) {
      throw new Error('Spending not found');
    }

    return spending;
  }

  remove(id: number) {
    const spending = this.prisma.spendingRecord.delete({
      where: {
        id,
      },
    });

    if (!spending) {
      throw new Error('Spending is not found');
    }

    return spending;
  }
}
