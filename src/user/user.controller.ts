import { Body, Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getUserProfile(@Body('userId') userId: number) {
    return this.userService.getUserProfile(userId);
  }
}
