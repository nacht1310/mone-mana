import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // This is a placeholder for the actual user profile retrieval logic.
  async getUserProfile(userId: number) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        omit: {
          hashedPassword: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException('User not found');
    }
  }
}
