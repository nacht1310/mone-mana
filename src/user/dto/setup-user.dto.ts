import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SetUpDiscordUserDto {
  @IsNotEmpty()
  discordId: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
