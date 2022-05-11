import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('by-auth-code')
  authoriseByAuthCode() {
    return this.authService.authoriseByAuthCode();
  }
}
