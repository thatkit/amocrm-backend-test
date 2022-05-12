# Backend App for getAmo

## Deployment

:rocket: [URL](https://kind-raspy-engine.glitch.me/) Glitch

## Rest API

:book: There's only one method that search a contact with the specified email and/or phone. If a contact is found, it's updated with the input data. Otherwise, it's created. In both cases a new lead is created with the contact attached to it.

One needs to specify `name`, `email`, and `phone`.

    fetch("https://kind-raspy-engine.glitch.me/contacts?filter[name]={Joe Black}&filter[phone]={844-770-2073}&filter[email]={extension@eugene.info}")
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      
## Technologies

NestJS + Typescript and amoCRM.
