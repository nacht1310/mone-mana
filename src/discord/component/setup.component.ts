import { Injectable } from '@nestjs/common';
import { Context, Modal, ModalContext, SelectedStrings, StringSelect, StringSelectContext } from 'necord';
import { UserService } from 'src/user/user.service';
import { DiscordService } from '../discord.service';

@Injectable()
export class SetUpComponentService {
  constructor(private discordService: DiscordService) {}

  @Modal('SETUP')
  public async onSetup(@Context() [interactions]: ModalContext) {
    const userData = {
      discordId: interactions.user.id,
      email: interactions.fields.getTextInputValue('email'),
      firstName: interactions.fields.getTextInputValue('firstName'),
      lastName: interactions.fields.getTextInputValue('lastName'),
    };

    const message = await this.discordService.setUpDiscordUser(userData);

    return interactions.reply({
      content: message,
    });
  }

  @StringSelect('CATEGORY_SELECT')
  public async onCategorySelect(@Context() [interactions]: StringSelectContext, @SelectedStrings() selectedString: Array<string>) {
    interactions.reply({
      content: `You have selected this value: ${selectedString.join(', ')}`
    })
  }
}
