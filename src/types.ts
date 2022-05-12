/* eslint-disable prettier/prettier */
import { CreateContactDto } from './contacts/dto/create-contact.dto';

export class QueryFields {
  filter: CreateContactDto;
}

export type FilterFieldName = 'email' | 'phone';

export type FilterFieldId = '756829' | '757025';

export class Contact {
  id: number;
  name: string;
  created_at: number;
  updated_at: number;
  created_by: number;
  updated_by: number;
  is_deleted: boolean;
  _links: any;
}

export class CreateNewContactInput {
  name: string;
  custom_fields_values: CustomField[];
}

export class CustomField {
  field_id: number;
  values: Value[];
}

export class Value {
  value: string;
}
