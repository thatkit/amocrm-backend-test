import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { AuthModule } from './auth/auth.module';
import { AmoCRMApiClient } from './amoCRMApiClient';

@Module({
  imports: [ContactsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AmoCRMApiClient],
})
export class AppModule {}
