import { Injectable } from '@nestjs/common';
import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { Public } from 'src/global/decorator';

@Public()
@Injectable()
export class SetUpCommandService {
  @SlashCommand({
    name: 'setup',
    description: 'Setup your information!',
  })
  public async startBot(@Context() [interactions]: SlashCommandContext) {
    return interactions.showModal(
      new ModalBuilder()
        .setTitle('Setup Information')
        .setCustomId('SETUP')
        .setComponents([
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents([
            new TextInputBuilder()
              .setCustomId('firstName')
              .setLabel('First Name')
              .setStyle(TextInputStyle.Short)
              .setRequired(false),
          ]),
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents([
            new TextInputBuilder()
              .setCustomId('lastName')
              .setLabel('Last Name')
              .setStyle(TextInputStyle.Short)
              .setRequired(false),
          ]),
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents([
            new TextInputBuilder()
              .setCustomId('email')
              .setLabel('Email')
              .setStyle(TextInputStyle.Short),
          ]),
        ]),
    );
  }
}
