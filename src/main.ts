import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Swagger } from '../config/swagger';

const portNumber = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Swagger.init(app);
  // tslint:disable-next-line: no-console
  console.info(`API running on http://localhost:${portNumber}/api`);
  await app.listen(portNumber);
}

bootstrap();
