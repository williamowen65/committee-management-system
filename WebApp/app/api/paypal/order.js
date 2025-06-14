

// handle POST request to create a PayPal order


const { handleResponse, generateAccessToken, base } = require("./common.js");
require("dotenv").config();
const logIf = require('../../../utils/logIf.js');

const fetch = require("node-fetch");
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

async function createOrderMiddleware(req, res, next) {
    try {
        const order = req.body;
        const accessToken = await generateAccessToken();
        const url = `${base}/v2/checkout/orders`;
        const payload = order;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
        });
        const resData = await handleResponse(response);
        req.orderResponse = resData;
        logIf.archive && console.log("order api", { resData })
        res.json(resData);
    } catch (error) {
        res.status(500).json({
            fn: 'createOrder',
            message: error.message
        });
    }
}

module.exports = createOrderMiddleware;
