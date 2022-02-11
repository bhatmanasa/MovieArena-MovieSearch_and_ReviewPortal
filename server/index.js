
import  cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/users.js';
import favoriteRoutes from './routes/favorite.js';
import reviewRoutes from './routes/review.js';
import mailTransporter from './config.js'
import dotenv from 'dotenv';
import { Console } from 'console';
const app = express();
const __dirname = path.resolve();


dotenv.config();

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/user',userRoutes);
app.use('/api/favorite',favoriteRoutes);
app.use('/api/review',reviewRoutes);

app.post('/sendEmail', (req, res) => {
  try {
    console.log('Got request');
    const mailOptions = {
      from: req.body.email, 
      to: 'filmosity.customer.service@gmail.com', 
      subject: req.body.subject, 
      html: `
      <h2>${req.body.name} has a query regarding ${req.body.subject}</h2>
      <h3><u>Contact Details</u></h3>
     
      <div>
       <b>Name: ${req.body.name}</b><br/><br/>
       <b> Email: ${req.body.email}</b><br/><br/>
       <b> Phone: ${req.body.phone}</b><br/><br/>
       <b> Message: ${req.body.message}</b><br/><br/>
      </div>`
    };

    console.log("Computed mail options");

    mailTransporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: 'Please try again later'
        });
      } else {
        res.send({
          success: true,
          message: 'Thanks for reaching out to us'
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Please try again later'
    });
  }
});


const CONNECTION_URL = 'mongodb+srv://user:Password1!@cluster0.hwujq.mongodb.net/test';
//mongodb+srv://user:Password1!@cluster0.hwujq.mongodb.net/UserRegistration

const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);