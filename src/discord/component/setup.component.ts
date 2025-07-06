import { Injectable } from '@nestjs/common';
import { Context, Modal, ModalContext } from 'necord';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SetUpComponentService {
  constructor(private userService: UserService) {}

  @Modal('SETUP')
  public async onSetup(@Context() [interactions]: ModalContext) {
    const userData = {
      discordId: interactions.user.id,
      email: interactions.fields.getTextInputValue('email'),
      firstName: interactions.fields.getTextInputValue('firstName'),
      lastName: interactions.fields.getTextInputValue('lastName'),
    };

    const message = await this.userService.setupDiscordUserProfile(userData);

    return interactions.reply({
      content: message,
    });
  }
}
