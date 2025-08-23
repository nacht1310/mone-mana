import { Injectable } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { Public } from 'src/global/decorator';
import { DiscordService } from '../discord.service';
import {
  AddSpendingCommandDTO,
  DeleteSpendingCommandDTO,
  EditSpendingCommandDTO,
} from './command.dto';
import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

@Public()
@Injectable()
export class SpendingCommandService {
  constructor(private _discordService: DiscordService) {}

  @SlashCommand({
    name: 'create_spending',
    description: 'Create new spending record',
  })
  public async addSpending(
    @Context() [interactions]: SlashCommandContext,
    @Options() options: AddSpendingCommandDTO,
  ) {
    const categories = await this._discordService.getAllCategories();
    const categoryMap = await this._discordService.recommendCategory(
      options.description,
    );

    const mostRecommendCategoryId = [...categoryMap.entries()].reduce(
      (prev, current) => (prev[1] > current[1] ? prev : current),
    );

    return interactions.reply({
      components: [
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents([
          new StringSelectMenuBuilder()
            .setCustomId('CATEGORY_SELECT') // replace with your customId
            .setPlaceholder('Select your category')
            .setMaxValues(1)
            .setMinValues(1)
            .setOptions([
              ...categories.map((value) => ({
                label: value.name,
                value: value.id.toString(),
                default: value.id === mostRecommendCategoryId[0],
              })),
            ]),
        ]),
      ],
    });
  }

  @SlashCommand({
    name: 'edit_spending',
    description: 'edit the spending record',
  })
  public async editSpending(
    @Context() [interactions]: SlashCommandContext,
    @Options() options: EditSpendingCommandDTO,
  ) {
    try {
      await this._discordService.editSpendingRecord(options.id, {
        description: options.description,
        amount: options.amount,
        category: options.category,
      });
    } catch {
      return interactions.reply({
        content: 'Unknown Error occurred!',
      });
    }

    return interactions.reply({
      content: 'You have successfully edit your spending',
    });
  }

  @SlashCommand({
    name: 'remove_spending',
    description: 'Remove a specific spending record',
  })
  public async deleteSpending(
    @Context() [interactions]: SlashCommandContext,
    @Options() options: DeleteSpendingCommandDTO,
  ) {
    try {
      await this._discordService.deleteSpendingRecord(options.id);
    } catch {
      return interactions.reply({
        content: 'Unknown Error occurred!',
      });
    }

    return interactions.reply({
      content: 'You have successfully remove the spending record!',
    });
  }
}
