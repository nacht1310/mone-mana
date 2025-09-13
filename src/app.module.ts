import { Module } from '@nestjs/common';
import { SpendingModule } from './spending/spending.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth/auth.guard';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { DiscordModule } from './discord/discord.module';
import { CategoryModule } from './category/category.module';

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
    DiscordModule,
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
