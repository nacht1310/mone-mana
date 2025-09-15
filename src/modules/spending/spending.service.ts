import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  CreateSpendingDto,
  QuerySpendingDto,
  UpdateSpendingDto,
} from './spending.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
    try {
      const spending = await this.prisma.spendingRecord.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return spending;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateSpendingDto: UpdateSpendingDto) {
    try {
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

      return spending;
    } catch (error) {
      if (error.code === 404) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const spending = await this.prisma.spendingRecord.delete({
        where: {
          id,
        },
      });

      return spending;
    } catch (error) {
      if (error.code === 404) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
