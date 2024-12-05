const functions = require('@google-cloud/functions-framework');

functions.http('googleapis', (req, res) => {
  res.send(`Hello ${req.query.name || req.body.name || 'World TEST CHANGE 3uelkfjsldkfjsdkjf'}!`);
});