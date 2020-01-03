import { environment } from '../../../environment';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: environment.emailProvider.hostURL,
      port: environment.emailProvider.port,
      secure: environment.emailProvider.secure, // true for 465, false for other ports
      auth: {
        user: environment.emailProvider.username,
        pass: environment.emailProvider.password,
      },
    });
  }

  async sendEmailVerification(mailOptions): Promise<boolean> {
    const sent = await new Promise<boolean>(async (resolve, reject) => {
      return await this.transporter.sendMail(
        mailOptions,
        async (error, info) => {
          if (error) {
            // tslint:disable-next-line: no-console
            console.log(`Unable to send: `, error);
            return reject(false);
          }
          // tslint:disable-next-line: no-console
          console.log(`Message sent: %s`, info.messageId);
          resolve(true);
        },
      );
    });

    return sent;
  }
}
