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
