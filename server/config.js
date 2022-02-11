import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();
var mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'filmosity.customer.service@gmail.com', 
    pass: 'filmosity@6' 
  }
});

export default mailTransporter;