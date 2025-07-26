import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { SetUpComponentService } from './component/setup.component';
import { SetUpCommandService } from './command/setup.command';
import { UserModule } from 'src/user/user.module';
import { SpendingCommandService } from './command/spending.command';

@Module({
  providers: [DiscordService, SetUpComponentService, SetUpCommandService, SpendingCommandService],
  imports: [UserModule],
})
export class DiscordModule {}
