import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
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

    return 'Login successful';
  }

  logout() {
    return 'Logout successful';
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
