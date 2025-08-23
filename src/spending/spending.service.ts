import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuerySpendingDto } from './dto';
import { CreateSpendingDto } from './dto/create-spending.dto';
import { UpdateSpendingDto } from './dto/update-spending.dto';

@Injectable()
export class SpendingService {
  constructor(private prisma: PrismaService) {}

  async create(createSpendingDto: CreateSpendingDto, userId: number) {
    const spending = await this.prisma.spendingRecord.create({
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

  async findAll(
    queryParams: QuerySpendingDto = {
      page: 0,
      size: 10,
      sortDirection: 'desc',
      sortField: 'date',
    },
  ) {
    const { page, size, sortDirection, sortField, ...filter } = queryParams;

    const spendingList = await this.prisma.spendingRecord.findMany({
      skip: size * page,
      take: size,
      orderBy: [{ [sortField ?? 'date']: sortDirection ?? 'desc' }],
      where: {
        categoryId: {
          in: filter.categoryIds ? filter.categoryIds : Prisma.skip,
        },
        userId: filter.userId,
        AND: [
          {
            date: {
              gte: filter.dateStart ? filter.dateStart : Prisma.skip,
            },
          },
          {
            date: {
              lte: filter.dateEnd ? filter.dateEnd : Prisma.skip,
            },
          },
        ],
      },
    });
    return spendingList;
  }

  async findOne(id: number) {
    const spending = await this.prisma.spendingRecord.findUnique({
      where: {
        id,
      },
    });

    if (!spending) {
      throw new Error('Spending not found');
    }

    return spending;
  }

  async update(id: number, updateSpendingDto: UpdateSpendingDto) {
    const spending = await this.prisma.spendingRecord.update({
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

  async remove(id: number) {
    const spending = await this.prisma.spendingRecord.delete({
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
