import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from '../../config/app.config';

export class Swagger {
  public docURL = ''; // Eg: `docs`
  private options = new DocumentBuilder()
    .setTitle(config.name)
    .setDescription(config.description)
    .setVersion(config.version)
    .build();
  private document = SwaggerModule.createDocument(this.app, this.options);

  constructor(private app) {}

  build() {
    SwaggerModule.setup(this.docURL, this.app, this.document);
  }

  log() {
    // tslint:disable-next-line: no-console
    console.warn(
      `API Documentation is running on http://localhost:${config.portNumber}/${this.docURL}`,
    );
  }
}
