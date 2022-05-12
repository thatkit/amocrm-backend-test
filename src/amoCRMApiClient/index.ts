/* eslint-disable prettier/prettier */
import 'dotenv/config';
// import fetch, { Headers, Request } from 'cross-fetch';
import 'cross-fetch/polyfill';
import { CreateNewContactInput, FilterFieldId } from 'src/types';
import { UnauthorizedException } from '@nestjs/common';
import { CreateContactDto } from 'src/contacts/dto/create-contact.dto';
import { UpdateContactDto } from 'src/contacts/dto/update-contact.dto';

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

    const response = await fetch(request);
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
        redirect_uri: 'https://5547-188-43-11-169.ngrok.io',
      }),
    });

    const response = await fetch(request);
    const json = await response.json();
    return json;
  };

  CREATE_CONTACT = async (contactData: CreateContactDto) => {
    try {
      const endpoint = `${this.baseUrl}/api/v4/contacts`;
      const payload: CreateNewContactInput[] = [
        {
          name: contactData.name,
          custom_fields_values: [
            {
              field_id: 756829,
              values: [{ value: contactData.email }],
            },
            {
              field_id: 757025,
              values: [{ value: contactData.phone }],
            },
          ],
        },
      ];

      const request = new Request(endpoint, {
        method: 'POST',
        headers: {
          ...this.headers,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      const response = await fetch(request);
      if (response.status === 200 || response.status === 201) {
        const json = await response.json();
        return json._embedded.contacts[0];
      }
      if (response.status === 401) throw new UnauthorizedException();
      throw new Error('unknown error');
    } catch (err) {
      console.log(err);
    }
  };

  FETCH_CONTACT_BY_FILTER = async (
    fieldName: FilterFieldId,
    fieldValue: string,
  ) => {
    try {
      const endpoint = `${this.baseUrl}/api/v3/contacts?filter[${fieldName}]=${fieldValue}`;

      const request = new Request(endpoint, {
        headers: {
          ...this.headers,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}`,
        },
      });

      const response = await fetch(request);
      if (response.status === 200) {
        const json = await response.json();
        return json._embedded.contacts[0];
      }
      if (response.status === 204) return [][0];
      if (response.status === 401) throw new UnauthorizedException();
      throw new Error('unknown error');
    } catch (err) {
      console.log(err);
    }
  };

  UPDATE_CONTACT = async (id: number, contactData: UpdateContactDto) => {
    try {
      const endpoint = `${this.baseUrl}/api/v4/contacts/${id}`;
      const payload: CreateNewContactInput = {
        name: contactData.name,
        custom_fields_values: [
          {
            field_id: 756829,
            values: [{ value: contactData.email }],
          },
          {
            field_id: 757025,
            values: [{ value: contactData.phone }],
          },
        ],
      };

      const request = new Request(endpoint, {
        method: 'PATCH',
        headers: {
          ...this.headers,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      const response = await fetch(request);
      if (response.status === 200) {
        const json = await response.json();
        return json;
      }
      if (response.status === 401) throw new UnauthorizedException();
      throw new Error('unknown error');
    } catch (err) {
      console.log(err);
    }
  };

  CREATE_LEAD = async (id: number) => {
    try {
      const endpoint = `${this.baseUrl}/api/v4/leads`;
      const payload = [
        {
          name: '',
          price: 0,
          _embedded: {
            contacts: [
              {
                id,
              },
            ],
          },
        },
      ];

      const request = new Request(endpoint, {
        method: 'POST',
        headers: {
          ...this.headers,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      const response = await fetch(request);
      if (response.status === 200 || response.status === 201) {
        const json = await response.json();
        return json._embedded.leads;
      }
      if (response.status === 204) return [][0];
      if (response.status === 401) throw new UnauthorizedException();
      throw new Error('unknown error');
    } catch (err) {
      console.log(err);
    }
  };
}
