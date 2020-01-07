import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from '../../config/app.config';
import { fancyLog } from './fancy-console';

export class Swagger {
  public docURL = ''; // Eg: `docs`
  private options = new DocumentBuilder()
    .setTitle(config.name)
    .setDescription(config.description)
    .setVersion(config.version)
    .build();

  constructor(private app) {}

  build() {
    const document = SwaggerModule.createDocument(this.app, this.options);
    SwaggerModule.setup(this.docURL, this.app, document);
  }

  log() {
    fancyLog(
      `API Documentation is running on:`,
      `http://localhost:${config.portNumber}/${this.docURL}`,
    );
  }
}
