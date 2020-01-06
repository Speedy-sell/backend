export const config = {
  portNumber: process.env.PORT || 3000,
  name: 'Resimac Loan Api 1.0',
  description: '/aresapi/swagger/v1/swagger.json',
  version: 'v1',
  enableMockResponse: process.env.ENABLE_MOCK_RESPONSE || false,
  hostURL: 'http://localhost:3000',
};
