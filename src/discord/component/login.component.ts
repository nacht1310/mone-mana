import { Injectable } from '@nestjs/common';
import { Button, ButtonContext, Context } from 'necord';

@Injectable()
export class ComponentService {
  @Button('Register')
  public async onRegisterClick(@Context() [interactions]: ButtonContext) {}

  @Button('Login')
  public async onLoginClick(@Context() [interactions]: ButtonContext) {}
}
