import * as nodemailer from 'nodemailer';
import { logError } from '../src/utils';

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '55063429ab4f9eb51',
    pass: process.env.EMAIL_PROVIDER_PASSWORD || 'undefined',
  },
});

const log = () => {
  if (!process.env.EMAIL_PROVIDER_PASSWORD) {
    logError(
      `WARNING:`,
      `Unable to find EMAIL_PROVIDER_PASSWORD. Your email might not work as expected`,
    );
  }
};

export const emailConfig = {
  transporter,
  log,
};
