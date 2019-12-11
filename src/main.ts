import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const portNumber = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(portNumber);
  console.info(`Application running on http://localhost:${portNumber}/`);
}

function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Speedy Sell')
    .setDescription('Buying and selling on steroids')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const subUrl = ``; /**Example: `api` */
  SwaggerModule.setup(subUrl, app, document);
}

bootstrap();
