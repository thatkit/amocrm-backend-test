import { Controller, Get, Query } from '@nestjs/common';
import { Contact, QueryFields } from 'src/types';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async findOne(@Query() query: QueryFields) {
    let contact: Contact;
    // (1) SEARCH for a contact by email
    contact = await this.contactsService.findOneByEmail(query.filter.email);

    // (2) IF NO contact found, SEARCH for a contact by phone
    if (!contact) {
      contact = await this.contactsService.findOneByPhone(query.filter.phone);
    }

    // (3) IF NO contact found, CREATE a new contact
    if (!contact) {
      return await this.contactsService.create(query.filter); // --> contact.id
    }

    // (4) if the contact is found, UPDATE a new contact
    return this.contactsService.update(contact.id, query.filter);
  }
}
