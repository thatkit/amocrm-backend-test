import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { AmoCRMApiClient } from 'src/amoCRMApiClient';
import { LeadsService } from 'src/leads/leads.service';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, LeadsService, AmoCRMApiClient],
})
export class ContactsModule {}
