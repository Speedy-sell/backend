if (!process.env.SENDGRID_PASSWORD) {
  // tslint:disable-next-line: no-console
  console.warn(
    `WARNING: Unable to find SENDGRID_PASSWORD. Your email might not work as expected`,
  );
}
export const config = {
  portNumber: process.env.PORT || 3000,
  name: 'Resimac Loan Api 1.0',
  description: '/aresapi/swagger/v1/swagger.json',
  version: 'v1',
  enableMockResponse: process.env.ENABLE_MOCK_RESPONSE || false,
  hostURL: 'http://localhost:3000',
  emailProvider: {
    hostURL: 'smtp.sendgrid.net',
    port: '587',
    secure: false, // true for 465, false for other ports
    username: 'apikey',
    password: process.env.SENDGRID_PASSWORD || 'undefined',
  },
};
