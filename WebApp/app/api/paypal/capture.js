
const { handleResponse, generateAccessToken, base } = require("./common.js");
require("dotenv").config();
const fetch = require("node-fetch");
const logIf = require('../../../utils/logIf.js');


/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (req, res, next) => {
    try {
        const accessToken = await generateAccessToken();
        const { orderID } = req.body;
        const url = `${base}/v2/checkout/orders/${orderID}/capture`;
        logIf.archive && console.log("captureOrder", { orderID, accessToken, url })


        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
            // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
          },
        });
      
        const resData = await handleResponse(response);
      
        logIf.archive && console.log("capture api",{ resData })
        // res.json(resData);
        res.json(resData);
    } catch (error) {
        res.status(500).json({ 
            fn: 'captureOrder',
            message: error.message });
    }
  };

  module.exports = captureOrder;