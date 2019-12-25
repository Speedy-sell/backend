import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const options = new DocumentBuilder()
  .setTitle('Speedy Sell')
  .setDescription('Buying and selling on steroids')
  .setVersion('1.0')
  .build();

export const Swagger = {
  init: app => {
    const document = SwaggerModule.createDocument(app, options);
    const subUrl = `api`;
    SwaggerModule.setup(subUrl, app, document);
  },
};
