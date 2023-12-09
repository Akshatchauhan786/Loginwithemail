// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/register', async (req, res) => {
  console.log('register', req.body);
  // Process registration logic here

  // Send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'akshat.chauhan.thakur@gmail.com',
      pass: 'bvqvmdxhcpqpokqm',
    },
  });

  const mailOptions = {
    from: 'akshat.chauhan.thakur@gmail.com',
    to: req.body.email,
    subject: 'Registration Successful',
    text: 'Thank you for registering!',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).send({
      message: 'Registration successful',
      emailSent: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Registration successful, but email could not be sent. Please contact support.',
      emailSent: false,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
