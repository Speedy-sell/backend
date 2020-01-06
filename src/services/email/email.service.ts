import { config } from '../../../config/app.config';
import { Injectable } from '@nestjs/common';
import { transporter } from '../../../config/email.config';

@Injectable()
export class EmailService {
  async sendEmailVerification(emailToken): Promise<boolean> {
    const mailOptions = {
      from: `"No-Reply" <no-reply@yourDomain.com>`,
      to: `joshinechar@gmail.com`,
      subject: `Account Verification`,
      html:
        `Hi! <br><br> Please click ` +
        `<a href=${config.hostURL}/auth/verify/${emailToken}>this link</a>` +
        ` to activate your account. `,
    };

    const sent = await new Promise<boolean>(async (resolve, reject) => {
      return await transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          // tslint:disable-next-line: no-console
          console.log(`Unable to send: `, error);
          return reject(false);
        }
        // tslint:disable-next-line: no-console
        console.log(`Message sent: %s`, info.messageId);
        resolve(true);
      });
    });

    return sent;
  }
}
