const functions = require('@google-cloud/functions-framework');
const { google } = require('googleapis');
const express = require('express');
const fs = require('fs');
const cors = require('cors');



const app = express();

app.use(cors()); // Enable CORS for all routes


// Middleware to parse JSON bodies
app.use(express.json());

// Log the route and the data received
app.use((req, res, next) => {
  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  console.log('Route:', req.path);
  console.log('Data:', req.body);
  next();
})

// const allowedOrigins = ['http://example.com', 'http://anotherdomain.com']; // Add your allowed origins here

// app.use((req, res, next) => {
//   const origin = req.get('Origin');

//   // Set CORS headers
//   // if (allowedOrigins.includes(origin)) {
//     res.set('Access-Control-Allow-Origin', origin);
//   // }
//   res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow the methods you need
//   res.set('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

//   // Handle preflight OPTIONS request
//   if (req.method === 'OPTIONS') {
//     return res.status(204).send('');
//   }
//   console.log("This request was sent from.... : ", { Origin: req.get("Origin") });

//   next();
// });

app.post('/gmail', async (req, res) => {
  console.log("1 Sending email");

  const auth = new google.auth.GoogleAuth({
    // const auth = new google.auth.JWT({
    keyFile: './credentials.json',
    scopes: ['https://mail.google.com/'],
    subject: 'ghost@gigharboropenstudiotour.org' // google admin email address to impersonate
  });
  // const client = await auth.authorize(); // once authorized, can do whatever you want

  console.log("2 Sending email");
  const client = await auth.getClient();
  console.log("3 Sending email");
  const gmail = google.gmail({ version: 'v1', auth: client });
  console.log("4 Sending email");

  // test sending an email
  const message = 'From: "me" <ghost@gigharboropenstudiotour.org>\r\n' +
    'To: "me" <ghost@gigharboropenstudiotour.org>\r\n' +
    'Subject: test\r\n' +
    'Content-Type: text/html; charset="UTF-8"' +
    '\r\n' +
    'test message';
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  try {

    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log("5 Sending email");
    res.send(result.data);
  } catch (error) {
    console.log("6 Sending email");
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email', details: error });
  }

})

// Define an endpoint that must be included in the body of the request
app.get('/', (req, res) => {
  // Give the api user some type of feedback (Server instructions)
  fs.readFile('welcome.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading file');
      return;
    }
    res.send(data);
  });
});

// Start the server
functions.http('googleapis', app);


