import { Injectable } from '@nestjs/common';
import { AmoCRMApiClient } from 'src/amoCRMApiClient';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly client: AmoCRMApiClient) {}

  create(createContactDto: CreateContactDto) {
    return this.client.CREATE_CONTACT(createContactDto);
  }

  findOneByEmail(email: string) {
    return this.client.FETCH_CONTACT_BY_FILTER('756829', email);
  }

  findOneByPhone(phone: string) {
    return this.client.FETCH_CONTACT_BY_FILTER('757025', phone);
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }
}
