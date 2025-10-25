import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  firstName?: string | null;
  lastName?: string | null;
}
