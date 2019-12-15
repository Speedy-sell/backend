import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Speedy Sell')
    .setDescription('Buying and selling on steroids')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const subUrl = ``; /**Example: `api` */
  SwaggerModule.setup(subUrl, app, document);
}
