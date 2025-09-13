import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SetUpDiscordUserDto } from './dto/setup-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
