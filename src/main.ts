import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  await app.listen(3000);
}

function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description here')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const subUrl = ``; /**Example: `api` */
  SwaggerModule.setup(subUrl, app, document);
}

bootstrap();
