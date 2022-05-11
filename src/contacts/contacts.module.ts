import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { AmoCRMApiClient } from 'src/amoCRMApiClient';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, AmoCRMApiClient],
})
export class ContactsModule {}
