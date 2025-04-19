import nodemailer from 'nodemailer';
import config from '../config';

export const emailSender = async (
  email: string,
  subject: string,
  text: string,
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: config.emailSender.email,
    to: email,
    subject: subject,
    html: text,
  });

  console.log('Message sent: %s', info.messageId);
};
