const functions = require('@google-cloud/functions-framework');
const { google } = require('googleapis');
const express = require('express');
const fs = require('fs');



const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/gmail', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
  });
  const client = await auth.getClient();
  const gmail = google.gmail({ version: 'v1', auth: client });
  const messages = await gmail.users.messages.list({
    userId: 'me',
  });
  res.send(messages.data);
})

// Define an endpoint that must be included in the body of the request
app.get('/', (req, res) => {
  fs.readFile('welcome.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading file');
      return;
    }
    res.send(data);
  });
});

functions.http('googleapis', app);


