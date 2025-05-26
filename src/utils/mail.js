import nodemailer from 'nodemailer';
import ApiError from './apiError.js'
import {MAIL_PASS, MAIL_PORT, MAIL_SERVICE, MAIL_USER, NODE_ENV} from '../constants.js'
import Mailgen from 'mailgen';
// Create a test account or replace with real credentials.
async function sendMail(options){
  try {
    const transporter = nodemailer.createTransport({
  host: MAIL_SERVICE,
  port: MAIL_PORT,
  secure: NODE_ENV === "development"?false:true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

const {emailbody, emailText} = mailgenConfig(options.mailFormat);
// Wrap in an async IIFE so we can use await.
  const mail = await transporter.sendMail({
    from: 'Nike" <contact@nike.email>',
    to: options.email,
    subject: options.subject,
    text: emailText, // plain‑text body
    html: emailbody, // HTML body
  });
  } catch (error) {
    throw ApiError.serverError(error.message)
  }
}
function mailgenConfig(mailFormat){
  const mailGenerator= new Mailgen({
    theme: 'default',
    product: {
      name : 'Nike',
      link : 'https://nike.com/'
    },
  });
  var emailbody = mailGenerator.generate(mailFormat);
  const emailText = mailGenerator.generatePlaintext(mailFormat)
  return {emailbody, emailText};
}

function verifyEmail(name, verifyUrl){
  return {
    body: {
      name: name,
      intro: "Welcome to Nike!",
      action: {
        instructions: 'To get started with Nike please click here',
        button:{
          color: "#22BC66",
          text: "Confirm Your account",
          links: "https://nike.com/verify",
        }
      }
    }
  }
  // return mailFormat;
  // sendMail({email, ...mailFormat })
}

export {sendMail, verifyEmail}