import { Injectable } from '@nestjs/common';
import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class CommandService {
  @SlashCommand({
    name: 'start',
    description: 'Start your money management journey!',
  })
  public async startBot(@Context() [interactions]: SlashCommandContext) {
    return interactions.reply({
      content:
        "First let's login to your account.\nIf you haven't had an account, please create one!",
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents([
          new ButtonBuilder().setCustomId('Register'),
          new ButtonBuilder().setCustomId('Login'),
        ]),
      ],
    });
  }
}
