import functions from '@google-cloud/functions-framework'
import { google } from 'googleapis'

const allowedOrigins = [
    'http://127.0.0.1:5501',
    'https://bethowenwatercolors.com',
];

functions.http('gmail', async (req, res) => {

    const origin = req.get('Origin');

    // Set CORS headers
    if (allowedOrigins.includes(origin)) {
        res.set('Access-Control-Allow-Origin', origin);
    }
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow the methods you need
    res.set('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(204).send('');
    }
    console.log("This request was sent from.... : ", { Origin: req.get("Origin") })

    let gmailData = JSON.parse(JSON.stringify(req.body.gmail))

    console.log("Gmail data to handle:  ", { gmailData })

    const result = await sendMessage(gmailData.emailLines)

    res.send(result);
});





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

function getGmailAPI(authClient) {
    return google.gmail({
        auth: authClient,
        version: 'v1'
    });
}



// sendMessage()


// getMessageList('admin@bethowenwatercolors.com', 10)
//     .then(data => {
//         console.log(data)
//     })



async function getMessageList(userId, qty) {

    const authClient = await getAuthClient()
    const gmail = getGmailAPI(authClient)

    const response = await gmail.users.messages.list({
        includeSpamTrash: false,
        maxResults: qty,
        q: "",
        userId: userId
    });

    // the data object includes a "messages" array of message data
    return Promise.all(response.data.messages.map(async m => await gmail.users.messages.get({ userId, id: m.id })))

}

async function sendMessage(emailLines) {

    const authClient = await getAuthClient()
    const gmail = getGmailAPI(authClient)

    const email = emailLines.join('\n');

    // Encode the email in base64url format
    const base64EncodedEmail = Buffer.from(email)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    try {
        const response = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: base64EncodedEmail,
            },
        });
        console.log('Email sent successfully:', response.data);
        return {
            message: 'success',
            data: response.data
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            message: 'error',
            error: error
        }
    }

}