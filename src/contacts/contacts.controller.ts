import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FilterQuery, QueryFields } from 'src/types';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  findOne(@Query() query: QueryFields) {
    const contactByEmail = this.contactsService.findOneByEmail(
      query.filter.email,
    );
    const contactByPhone = this.contactsService.findOneByPhone(
      query.filter.phone,
    );
    return {
      contactByEmail,
      contactByPhone,
    };
  }
}
