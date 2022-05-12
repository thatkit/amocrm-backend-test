/* eslint-disable prettier/prettier */
import 'dotenv/config';
import fetch, { Headers, Request } from 'cross-fetch';
import { FilterFieldId } from 'src/types';

export class AmoCRMApiClient {
  baseUrl = `https://${process.env.AMOCRM_LOGIN}.amocrm.ru`;
  headers = new Headers();

  FETCH_ACCESS_TOKEN_BY_AUTH_CODE = async () => {
    const endpoint = `${this.baseUrl}/oauth2/access_token`;
    const request = new Request(endpoint, {
      method: 'POST',
      headers: { ...this.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.AMOCRM_ID,
        client_secret: process.env.AMOCRM_SECRET_KEY,
        grant_type: 'authorization_code',
        code: process.env.AUTH_CODE,
        redirect_uri: 'https://5547-188-43-11-169.ngrok.io',
      }),
    });
    // console.log('request:', request.headers);
    const response = await fetch(request);
    // console.log('response:', response);
    const json = await response.json();
    return json;
  };

  FETCH_ACCESS_TOKEN_BY_REFRESH_TOKEN = async () => {
    const endpoint = `${this.baseUrl}/oauth2/access_token`;
    const request = new Request(endpoint, {
      method: 'POST',
      headers: { ...this.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.AMOCRM_ID,
        client_secret: process.env.AMOCRM_SECRET_KEY,
        grant_type: 'refresh_token',
        refresh_token: process.env.AMOCRM_REFRESH_TOKEN,
        redirect_uri: 'https://cf45-188-43-11-169.eu.ngrok.io',
      }),
    });
    // console.log('request:', request.body);
    const response = await fetch(request);
    // console.log('response:', response);
    const json = await response.json();
    return json;
  };

  FETCH_CONTACT_BY_FILTER = async (
    fieldName: FilterFieldId,
    fieldValue: string,
  ) => {
    const endpoint = `${this.baseUrl}/api/v3/contacts?filter[${fieldName}]=${fieldValue}`;
    const request = new Request(endpoint, {
      headers: {
        ...this.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}`,
      },
    });
    // console.log('request:', request.headers);
    const response = await fetch(request);
    const json = await response.json();
    // console.log('json:', json._embedded.contacts);
    return json;
  };
}
