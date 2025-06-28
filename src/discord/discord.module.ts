import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { ComponentService } from './component/component.service';
import { CommandService } from './command/command.service';

@Module({
  providers: [DiscordService, ComponentService, CommandService],
  
})
export class DiscordModule {}
