import { Injectable } from '@nestjs/common';
import { AmoCRMApiClient } from 'src/amoCRMApiClient';

@Injectable()
export class LeadsService {
  constructor(private readonly client: AmoCRMApiClient) {}

  create(contactId: number) {
    return this.client.CREATE_LEAD(contactId);
  }
}
