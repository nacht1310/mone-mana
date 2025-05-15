import { Injectable } from '@nestjs/common';
import { CreateSpendingDto } from './dto/create-spending.dto';
import { UpdateSpendingDto } from './dto/update-spending.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuerySpendingDto } from './dto';

@Injectable()
export class SpendingService {
  constructor(private prisma: PrismaService) {}

  create(createSpendingDto: CreateSpendingDto, userId: number) {
    const spending = this.prisma.spendingRecord.create({
      data: {
        ...createSpendingDto,
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
      orderBy: [{ [sortField]: sortDirection }],
      // where: {
      //   ...filter,
      // },
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
