import { Controller, Get, Query } from '@nestjs/common';
import { LeadsService } from 'src/leads/leads.service';
import { Contact, QueryFields } from 'src/types';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly leadsService: LeadsService,
  ) {}

  @Get()
  async findOne(@Query() query: QueryFields) {
    let contact: Contact;
    // (1) SEARCH for a contact by email
    contact = await this.contactsService.findOneByEmail(query.filter.email);

    // (2) IF NO contact found, SEARCH for a contact by phone
    if (!contact) {
      contact = await this.contactsService.findOneByPhone(query.filter.phone);
    }

    let contactId: number;
    // (3) IF NO contact found, CREATE a new contact
    if (!contact) {
      const { id } = await this.contactsService.create(query.filter);
      contactId = id;
    } else {
      // (4) if the contact is found, UPDATE a new contact and retrieve the id
      const { id } = await this.contactsService.update(
        contact.id,
        query.filter,
      );
      contactId = id;
    }

    // (5) CREATE a lead with the contact
    const leads = await this.leadsService.create(contactId);

    // (6) return contact id and lead id
    return { contactId, leads };
  }
}
