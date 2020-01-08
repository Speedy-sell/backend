// tslint:disable: no-console

import { config } from '../../../config/app.config';
import { Injectable } from '@nestjs/common';
import { emailConfig } from '../../../config/email.config';

@Injectable()
export class EmailService {
  private sendEmail(mailOptions) {
    emailConfig.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Unable to send: `, error);
      } else if (info) {
        console.log(`Message sent: %s`, info.messageId);
      }
    });
  }

  async sendEmailVerification(emailToken) {
    if (config.disableEmail) {
      return;
    }
    this.sendEmail({
      from: `"No-Reply" <no-reply@yourDomain.com>`,
      to: `joshinechar@gmail.com`,
      subject: `Account Verification`,
      html:
        `Hi! <br><br> Please click ` +
        `<a href=${config.hostURL}/auth/verify/${emailToken}>this link</a>` +
        ` to activate your account. `,
    });
  }
}
