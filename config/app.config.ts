const portNumber = process.env.PORT || 3000;

export const config = {
  portNumber,
  name: 'Resimac Loan Api 1.0',
  description: '/aresapi/swagger/v1/swagger.json',
  version: 'v1',
  enableMockResponse: process.env.ENABLE_MOCK_RESPONSE || false,
  hostURL: `http://localhost:${portNumber}`,
};
