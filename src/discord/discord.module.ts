import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { SetUpComponentService } from './component/setup.component';
import { SetUpCommandService } from './command/setup.command';
import { UserModule } from 'src/user/user.module';
import { SpendingCommandService } from './command/spending.command';
import { SpendingModule } from 'src/spending/spending.module';

@Module({
  providers: [DiscordService, SetUpComponentService, SetUpCommandService, SpendingCommandService],
  imports: [UserModule, SpendingModule],
})
export class DiscordModule {}
