// const nodemailer = require('nodemailer');

// // Create a transporter object
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'bensoniyanutimothy@gmail.com',
//         pass: '11111'
//     }
// })

// // Set up email data

// let mailOptions = {
//     from: 'timothybnsn@gmail.com',
//     to: 'bensoniyanutimothy@gmail.com',
//     subject: 'Hello from Node.js',
//     text: 'This is a test email sent from a Node.js script.'
// };

// // Send mail
// transporter.sendMail(mailOptions, function (err, info) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log('Email sent: ' + info.response)
// });

// More secure code
const nodemailer = require('nodemailer');
const { generateToken, getToken } = require('gmail-oauth2');

// Set up OAuth 2.0
const oauth2 = async () => {
  try {
    const tokenUrl = 'https://accounts.google.com/o/oauth2/token';
    const tokenInfoUrl = 'https://openidconnect.googleapis.com/v1/tokeninfo';
    const oAuth2Client = new google.auth.OAuth2(
      'YOUR_CLIENT_ID',
      'YOUR_CLIENT_SECRET',
      'YOUR_REDIRECT_URI'
    );

    const token = await getToken(oAuth2Client, tokenUrl, tokenInfoUrl);
    return token;
  } catch (error) {
    console.error(error);
  }
};

// Create a transporter object
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: async () => {
    const token = await oauth2();
    return {
      type: 'OAuth2',
      user: 'bensoniyanutimothy@gmail.com',
      accessToken: token.access_token,
    };
  },
});

// Set up email data
let mailOptions = {
  from: 'timothybnsn@gmail.com',
  to: 'bensoniyanutimothy@gmail.com',
  subject: 'Hello from Node.js',
  text: 'This is a test email sent from a Node.js script.',
};

// Send mail
transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    return console.log(err);
  }
  console.log('Email sent: ' + info.response);
});