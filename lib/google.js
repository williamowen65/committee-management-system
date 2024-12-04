import functions from '@google-cloud/functions-framework'
import { google } from 'googleapis'


/**
 * This file is meant to provide an easy way for the rest of the app to work with google services
 * 
 * The main thing I want it to do is deal with authentication for the service. 
 * Auth uses JWT with a short expiry time. When I call a service I want the auth logic to be implied
 * 
 * There are many services that can be used with googleapis. I will start with sheets.
 * I will potentially use gmail, calendar, and other services. 
 * 
 * There are a few set up steps to get this working:
 * 1. Create a service account in the google cloud console
 * 2. Create a private key for the service account
 * 3. Share the service account email address with the google service you want to use
 * 4. Create a private_key.json file in the root of the project
 * 5. Add the private key to the private_key.json file
 * 6. Add the private_key.json file to the .gitignore
 * 7. Use the getAuthClient function to get an authorized client
 * 8. Use the client to call the google service
 * 
 */

async function getAuthClient() {

    const JWT = google.auth.JWT;
    const authClient = new JWT({
        keyFile: './private_key.json',
        scopes: ['https://mail.google.com/'],
        subject: 'admin@bethowenwatercolors.com' // google admin email address to impersonate
    });
    await authClient.authorize(); // once authorized, can do whatever you want
    return authClient
}