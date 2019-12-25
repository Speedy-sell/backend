import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Swagger } from '../config/swagger';
import { config } from '../config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swagger = new Swagger(app);
  swagger.build();

  await app.listen(config.portNumber);
}

bootstrap();
