import { Injectable } from '@nestjs/common';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { Public } from 'src/global/decorator';

@Public()
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
          new ButtonBuilder()
            .setCustomId('Register')
            .setLabel('Register')
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId('Login')
            .setLabel('Login')
            .setStyle(ButtonStyle.Primary),
        ]),
      ],
    });
  }
}
