
/**
 * This file is meant to provide an easy way for the rest of the app to work with google services
 * 
 * The Google Api Library won't work in the browser, so You must setup Google Cloud functions and deploy there.
 * 
 * There are many services that can be used with googleapis. Sheet, gmail, calendar, and other services. 
 * 
 * There are a few set up steps to get this working:
 * 1. Create a service account in the google cloud console
 * 2. Create a private key for the service account
 * 3. Share the service account email address with the google service you want to use
 * 4. Create a private_key.json file in the root of the project
 * 5. Add the private key to the private_key.json file
 * 6. Add the private_key.json file to the .gitignore
 * 7. Set up billing on the google cloud project if needed (for functions -- also set billing alerts )
 * 8. Set up the google cloud function to handle the request (function name: googleapis ... ALSO name the entry point this.)
 * 9. Allow unauthorized requests to the function
 * 8. Use the client to call the google service
 * 
 */



// import functions from '@google-cloud/functions-framework'
// import { google } from 'googleapis'
// import "dotenv/config"
// const path = require('path');
// const dotenv = require('dotenv');
// dotenv.config({ path: path.resolve(__dirname, '../../.env') });


// async function getAuthClient() {

//     const JWT = google.auth.JWT;
//     const authClient = new JWT({
//         keyFile: ,
//         scopes: ['https://mail.google.com/'],
//         subject: 'admin@bethowenwatercolors.com' // google admin email address to impersonate
//     });
//     await authClient.authorize(); // once authorized, can do whatever you want
//     return authClient
// }