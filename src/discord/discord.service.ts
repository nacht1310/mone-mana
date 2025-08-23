import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { UpdateSpendingDto } from 'src/spending/dto';
import { SpendingService } from 'src/spending/spending.service';
import { SetUpDiscordUserDto } from 'src/user/dto/setup-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DiscordService {
  constructor(
    private userService: UserService,
    private spendingService: SpendingService,
    private categoryService: CategoryService,
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

  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  async recommendCategory(description: string) {
    return await this.categoryService.recommendCategory(description);
  }
}
