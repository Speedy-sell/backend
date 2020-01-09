// tslint:disable: no-console

import { config } from '../../../config/app.config';
import { Injectable } from '@nestjs/common';
import { emailConfig } from '../../../config/email.config';

@Injectable()
export class EmailService {
  defaultSender = `"No-Reply" <no-reply@yourDomain.com>`;

  private sendEmail(mailOptions) {
    if (config.disableEmail) {
      return;
    }
    emailConfig.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Unable to send: `, error);
      } else if (info) {
        console.log(`Message sent: %s`, info.messageId);
      }
    });
  }

  sendEmailVerification(recipientEmailAddress, emailToken) {
    this.sendEmail({
      from: this.defaultSender,
      to: recipientEmailAddress,
      subject: `Account Verification`,
      html:
        `Hi! <br><br> Please click ` +
        `<a href=${config.hostURL}/auth/verify/${emailToken}>this link</a>` +
        ` to activate your account. `,
    });
  }
}
