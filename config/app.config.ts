export const config = {
  portNumber: 3000,
  name: 'Resimac Loan Api 1.0',
  description: '/aresapi/swagger/v1/swagger.json',
  version: 'v1',
  // TODO enable mock response only in dev environment
  enableMockResponse: true,
  hostURL: 'http://localhost:3000',

  mail: {
    host: 'smtp.sendgrid.net',
    port: '587',
    secure: false,
    username: 'apikey',
    password:
      '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',
  },
};
