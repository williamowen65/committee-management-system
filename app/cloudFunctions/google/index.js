const functions = require('@google-cloud/functions-framework');
const { google } = require('googleapis');


functions.http('googleapis', (req, res) => {
  console.log({google})
  res.send(`Hello ${req.query.name || req.body.name || 'World TEST CHANGE 3uelkfjsldkfjsdkjf'}!`);
});