import { Injectable } from '@nestjs/common';
import { UpdateSpendingDto } from 'src/spending/dto';
import { SpendingService } from 'src/spending/spending.service';
import { SetUpDiscordUserDto } from 'src/user/dto/setup-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DiscordService {
  constructor(
    private userService: UserService,
    private spendingService: SpendingService,
  ) {}

  async setUpDiscordUser(data: SetUpDiscordUserDto) {
    return await this.userService.setupDiscordUserProfile(data);
  }

  async editSpendingRecord(id: number, updateData: UpdateSpendingDto) {
    return await this.spendingService.update(id, updateData);
  }

  async deleteSpendingRecord(id: number) {
    return await this.spendingService.remove(id);
  }
}
