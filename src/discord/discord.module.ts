import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { SetUpComponentService } from './component/setup.component';
import { SetUpCommandService } from './command/setup.command';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [DiscordService, SetUpComponentService, SetUpCommandService],
  imports: [UserModule],
})
export class DiscordModule {}
