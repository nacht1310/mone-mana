import { Module } from '@nestjs/common';
import { SpendingModule } from './modules/spending/spending.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth/auth.guard';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { CategoryModule } from './modules/category/category.module';

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
    NecordModule.forRoot({
      token: process.env.DISCORD_BOT_TOKEN || '',
      intents: [IntentsBitField.Flags.DirectMessages],
      development: [process.env.DISCORD_DEVELOPMENT_GUILD_ID || ''],
    }),
    CategoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
