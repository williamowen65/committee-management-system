const functions = require('@google-cloud/functions-framework');
const { google } = require('googleapis');
const express = require('express');
const fs = require('fs');
const cors = require('cors');



const app = express();

app.use(cors()); // Enable CORS for all routes


// Middleware to parse JSON bodies
app.use(express.json());

app.get('/gmail', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    // scopes: ['https://mail.google.com/'],
    scopes: ['https://www.googleapis.com/auth/gmail.send'],
  });


const client = await auth.getClient();

  const gmail = google.gmail({ version: 'v1', auth: client });
  // test sending an email
  const message = 'From: "me" <   >\r\n' +
    'To: "me" <   >\r\n' +
    'Subject: test\r\n' +
    '\r\n' +
    'test message';
  const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const result = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });
  res.send(result.data);
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


