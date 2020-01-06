import { config } from '../../../config/app.config';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.emailProvider.hostURL,
      port: config.emailProvider.port,
      secure: config.emailProvider.secure, // true for 465, false for other ports
      auth: {
        user: config.emailProvider.username,
        pass: config.emailProvider.password,
      },
    });
  }

  async sendEmailVerification(emailToken): Promise<boolean> {
    const mailOptions = {
      // TODO check this one
      from: `"Speedy Sell" <${config.emailProvider.username}>`,
      to: `joshinechar@gmail.com`, // list of receivers (separated by ,)
      subject: `hello`,
      text: `Testing`,
      html:
        `Hi! <br><br> Please click` +
        `<a href=${config.hostURL}/verify/${emailToken}>this link</a>` +
        `to activate your account. `,
    };

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
