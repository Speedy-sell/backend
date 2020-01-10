import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Swagger } from './utils';
import { config, emailConfig } from '../config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swagger = new Swagger(app);
  swagger.build();
  await app.listen(config.portNumber);
  emailConfig.log();
  swagger.log();
}

bootstrap();
