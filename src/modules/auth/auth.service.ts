import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(body: LoginDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        userName: body.userName,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    if (!existingUser.hashedPassword) {
      throw new ForbiddenException(
        'User is setup in discord. Please move to discord to use our bot!',
      );
    }

    const passwordMatches = await argon.verify(
      existingUser.hashedPassword,
      body.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      userName: existingUser.userName,
      sub: existingUser.id,
    };

    return {
      token: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      }),
    };
  }

  async register(body: RegisterDto) {
    const hash = await argon.hash(body.password);
    const { password, ...userData } = body;

    try {
      const user = await this.prisma.user.create({
        data: {
          ...userData,
          hashedPassword: hash,
        },
        omit: {
          hashedPassword: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('User already exists');
        }
      }
      throw error;
    }
  }
}
