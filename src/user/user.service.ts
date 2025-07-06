import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SetUpDiscordUserDto } from './dto/setup-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // This is a placeholder for the actual user profile retrieval logic.
  async getUserProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
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

  async setupDiscordUserProfile(user: SetUpDiscordUserDto) {
    const discordUser = await this.prisma.user.findFirst({
      where: {
        discordId: user.discordId,
      },
      omit: {
        hashedPassword: true,
      },
    });

    if (!discordUser) {
      await this.prisma.user.create({
        data: {
          ...user,
        },
        omit: {
          hashedPassword: true,
        },
      });

      return 'Create user successfully!';
    } else {
      await this.prisma.user.update({
        where: {
          id: discordUser.id,
        },
        data: {
          ...user,
        },
        omit: {
          hashedPassword: true,
        },
      });

      return 'Update user successfully!';
    }
  }

  async getDiscordUserProfile(discordId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        discordId: discordId,
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
