

// handle POST request to create a PayPal order


const { handleResponse, generateAccessToken, base } = require("./common.js");
require("dotenv").config();
const fetch = require("node-fetch");
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

async function createOrderMiddleware(req, res, next) {
    try {
        const order = req.body;
        const accessToken = await generateAccessToken();
        const url = `${base}/v2/checkout/orders`;
        const payload = order;

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
            body: JSON.stringify(payload),
        });

        const resData = await handleResponse(response);
        req.orderResponse = resData;
        console.log("order api", {resData})
        res.json(resData);
    } catch (error) {
        res.status(500).json({ 
            fn: 'createOrder',
            message: error.message });
    }
}

module.exports = createOrderMiddleware;




// import { handleResponse, generateAccessToken, base } from "../_methods.js"
// const env = import.meta.env


// const { VITE_PAYPAL_CLIENT_ID, VITE_PAYPAL_CLIENT_SECRET } = env



// export async function POST({ request }) {
//     try {

//         const order = await request.json()
//         // use the cart information passed from the front-end to calculate the purchase unit details
//         // console.log(
//         //     "shopping cart information passed from the frontend createOrder() callback:",
//         //     order,
//         // );

//         const accessToken = await generateAccessToken();
//         // console.log({ accessToken })

//         const url = `${base}/v2/checkout/orders`;
//         const payload = order

//         const response = await fetch(url, {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accessToken}`,
//                 // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
//                 // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
//                 // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
//                 // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
//                 // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
//             },
//             method: "POST",
//             body: JSON.stringify(payload),
//         });
//         const resData = await handleResponse(response)
//         // console.log({ resData })
//         return json({
//             ...resData
//         })
//     } catch (error) {
//         return json({
//             classOrder: { message: error }
//         })

//     }
// }

