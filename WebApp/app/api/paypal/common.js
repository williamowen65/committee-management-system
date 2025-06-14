require('dotenv').config()
const fetch = require('node-fetch')
const logIf = require('../../../utils/logIf.js');

const { PAYPAL_CLIENT_ID, PAYPAL_SECRET, DEPLOYMENT} = process.env
logIf.paypal && console.log({PAYPAL_CLIENT_ID, PAYPAL_SECRET, DEPLOYMENT})

// const base = DEPLOYMENT == 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com'
const base = 'https://api-m.paypal.com'


async function handleResponse(response) {
    try {
        const jsonResponse = await response.json();
        return ({
            jsonResponse,
            httpStatusCode: response.status,
            // PAYPAL_CLIENT_ID, PAYPAL_SECRET
        })
    } catch (err) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}


/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
    try {
        if (!PAYPAL_CLIENT_ID ||  !PAYPAL_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS IDS: " + PAYPAL_CLIENT_ID + " " + PAYPAL_SECRET);
        }
        const auth = Buffer.from(
            PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET,
        ).toString("base64");
        const response = await fetch(`${base}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();
        logIf.paypal && console.log("generateAccessToken", {
            token: data.access_token,
            auth,
            test:123,
            base
        })
        
        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
};

module.exports = { handleResponse, generateAccessToken, base }