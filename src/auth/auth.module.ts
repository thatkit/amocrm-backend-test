import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AmoCRMApiClient } from 'src/amoCRMApiClient';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AmoCRMApiClient],
})
export class AuthModule {}
