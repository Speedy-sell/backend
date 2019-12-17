import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './setup/swagger';

const portNumber = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  console.info(`Application running on http://localhost:${portNumber}/`);
  await app.listen(portNumber);
}

bootstrap();
