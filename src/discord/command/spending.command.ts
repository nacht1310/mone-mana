import { Injectable } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { Public } from 'src/global/decorator';
import { DiscordService } from '../discord.service';
import {
  AddSpendingCommandDTO,
  DeleteSpendingCommandDTO,
  EditSpendingCommandDTO,
} from './command.dto';

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
    return interactions.reply({
      content: '',
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
