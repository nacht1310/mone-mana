import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // This is a placeholder for the actual user profile retrieval logic.
  getUserProfile(userId: number) {
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      omit: {
        hashedPassword: true,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return user;
  }
}
