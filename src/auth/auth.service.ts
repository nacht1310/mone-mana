import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async login(body: LoginDto) {
    return 'Login successful';
  }

  logout() {
    return 'Logout successful';
  }

  async register(body: RegisterDto) {
    const hash = await argon.hash(body.password);
    const { password, ...userData } = body;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (existingUser) {
      return 'User already exists';
    }

    await this.prisma.user.create({
      data: {
        ...userData,
        hashedPassword: hash,
      },
      omit: {
        hashedPassword: true,
      },
    });

    return 'Create user successful';
  }
}
