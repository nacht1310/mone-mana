import { Module } from '@nestjs/common';
import { SpendingModule } from './spending/spending.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SpendingModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
