'use strict';
import * as nodemailer from 'nodemailer';
import { configs } from './dotenv';

// async..await is not allowed in global scope, must use a wrapper
export async function main(
  email: string,
  message: string,
  textMessage: string,
) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: configs().userEmail,
      pass: configs().userPassword,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 's.ishimwegabin@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Portfolio Contact 😃', // Subject line
    text: textMessage, // plain text body
    html: message, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });
}
