export const config = {
  portNumber: process.env.PORT || 3000,
  name: 'Resimac Loan Api 1.0',
  description: '/aresapi/swagger/v1/swagger.json',
  version: 'v1',
  // TODO enable mock response only in dev environment
  enableMockResponse: process.env.ENABLE_MOCK_RESPONSE || false,
  hostURL: 'http://localhost:3000',
  emailProvider: {
    hostURL: 'smtp.sendgrid.net',
    port: '587',
    secure: false, // true for 465, false for other ports
    username: 'apikey',
    password: process.env.SEND_GRID_PASSWORD || 'undefined',
  },
};
