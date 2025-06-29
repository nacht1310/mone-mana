import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { ComponentService } from './component/login.component';
import { CommandService } from './command/login.command';

@Module({
  providers: [DiscordService, ComponentService, CommandService],
  
})
export class DiscordModule {}
