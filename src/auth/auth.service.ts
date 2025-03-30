import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async login(body: LoginDto) {
    const hash = await argon.hash(body.password);

    const user = await this.prisma.user.create({
      data: {
        email: body.email,
        hashedPassword: hash,
      },
      omit: {
        hashedPassword: true,
      },
    });

    console.log('User created:', user);

    return 'Login successful';
  }

  logout() {
    return 'Logout successful';
  }

  register() {
    return 'Registration successful';
  }
}
