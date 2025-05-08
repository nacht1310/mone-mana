import { Module } from '@nestjs/common';
import { SpendingModule } from './spending/spending.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SpendingModule,
    AuthModule,
    UserModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
