import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from './app.config';

export class Swagger {
  public docURL = ''; // Eg: `docs`
  private options = new DocumentBuilder()
    .setTitle('Speedy Sell')
    .setDescription('Buying and selling on steroids')
    .setVersion('1.0')
    .build();
  private document = SwaggerModule.createDocument(this.app, this.options);

  constructor(private app) {}

  build() {
    SwaggerModule.setup(this.docURL, this.app, this.document);
    this.log();
  }

  log() {
    // tslint:disable-next-line: no-console
    console.warn(
      `API Documentation is running on http://localhost:${config.portNumber}/${this.docURL}`,
    );
  }
}
