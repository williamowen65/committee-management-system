import functions from '@google-cloud/functions-framework'
import { google } from 'googleapis'



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