import { Injectable } from '@nestjs/common';
import { AmoCRMApiClient } from 'src/amoCRMApiClient';

@Injectable()
export class AuthService {
  constructor(private readonly client: AmoCRMApiClient) {}

  authoriseByAuthCode() {
    return this.client.FETCH_ACCESS_TOKEN_BY_AUTH_CODE();
  }
}
