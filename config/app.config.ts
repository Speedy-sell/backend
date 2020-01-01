export const config = {
  portNumber: 3000,
  name: 'Resimac Loan Api 1.0',
  description: '/aresapi/swagger/v1/swagger.json',
  version: 'v1',
  // TODO enable mock response only in dev environment
  enableMockResponse: true,

  // TODO fill this up
  host: {
    url: 'http://localhost/',
    port: '3000',
  },

  mail: {
    host: 'smtp.mailgun.org',
    port: '587',
    secure: false,
    username: 'postmaster@sandbox5e0457d4047e4698aa98165836e992d4.mailgun.org',
    password: '5c58883b63a45efa1a7f8b4bc51050ce-6f4beb0a-cde8e898',
  },
};
