/* eslint-disable prettier/prettier */
export class QueryFields {
  filter: FilterQuery;
}

export class FilterQuery {
  name: string;
  email: string;
  phone: string;
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
