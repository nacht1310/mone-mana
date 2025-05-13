import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(body: LoginDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!existingUser) {
      throw new ForbiddenException('User not found');
    }

    const passwordMatches = await argon.verify(
      existingUser.hashedPassword,
      body.password,
    );

    if (!passwordMatches) {
      throw new ForbiddenException('Invalid password');
    }

    const payload = {
      email: existingUser.email,
      sub: existingUser.id,
    };

    return await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
  }

  async register(body: RegisterDto) {
    const hash = await argon.hash(body.password);
    const { password, ...userData } = body;

    try {
      await this.prisma.user.create({
        data: {
          ...userData,
          hashedPassword: hash,
        },
        omit: {
          hashedPassword: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw 'User already exists';
        }
      }
      throw error;
    }

    return 'Create user successful';
  }
}
