import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { Contact, QueryFields } from 'src/types';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  async findOne(@Query() query: QueryFields) {
    let contact: Contact;
    // (1) Search for a contact by email
    contact = await this.contactsService.findOneByEmail(query.filter.email);

    // (2) IF NO contact found, search for a contact by phone
    if (!contact) {
      contact = await this.contactsService.findOneByPhone(query.filter.phone);
    }

    if (!contact) {
      return 'POST new contact';
    }

    return 'PATCH existing contact';
  }
}
