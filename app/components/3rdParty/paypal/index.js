import paypalTemplate from './index.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../../utils/custom-element';
// import styles from './style.scss.txt';

// Attach the paypal script to the head of the document
const script = document.createElement('script');
// Add a custom Client ID 
script.src = "https://www.paypal.com/sdk/js?client-id=Afs2Ei8jIPZLq82X3RlBG8IjcfeWrKTabg0JPbykmgR1yv9VkQIqCt86C65x42Zi0vPnHrjlRuRAuIiD&components=buttons&enable-funding=venmo&disable-funding=credit&currency=USD";
document.head.appendChild(script);
script.onload = initializePaypalButtons

/**
 * This component is a wrapper for the paypal button and logic
 * Paypal offers a few workflows.
 * 
 * This logic is copied over from another project where paypal is working. 
 * The goal is to encapsulate all of it and document it here.
 * 
 */
let paypalButtonAction

createCustomElement('paypal-component', function () {

        // Initialize paypal buttons
        // initializePaypalButtons(); // using script on load event
    

}, paypalTemplate, "");


function initializePaypalButtons(){
    // Create random Id for the paypal interaction
    const transactionId = 'ghost-artist-fee-recept-id_' + Math.floor(Math.random() * 1000000)

    // Initialize paypal buttons
    let paypalPayload = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: "1.00",
            },
            reference_id: transactionId,
            custom_id: transactionId,
            description: ('A TEST PAYPAL EXCHANGE').slice(0, 127),
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      }

      paypal
      .Buttons({
        onInit: function (data, actions) {
          // Disable the buttons
        //   const modal = jQuery('#' + modalId)
        //   const modalData = modal.data()

          console.log('oninit', {
            data,
            actions,
          })

          // actions.disable()
          paypalButtonAction = actions

          // // Disable the buttons if based on form data

        //   resultMessage('')
          // actions.disable()
        },
        async createOrder(data, actions) {
        //   consoleIf('paypal')?.log('createOrder', { data, actions })

          try {
            const response = await fetch('/api/paypal/order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              // use the "body" param to optionally pass additional order information
              // like product ids and quantities
              body: JSON.stringify(paypalPayload),
            });

            // if (!response.ok) {




                // SOMETHING FISHY IS GOING ON HERE
                // The pay pal error is because caused by a json parsing error
                // apply logs....



            //   throw new Error(`HTTP error! status: ${response.status}`);
            // }

            const orderData = await response.json()

            // consoleIf('paypal')?.log('createdOrder', { orderData })

            if (orderData.jsonResponse.id) {
              return orderData.jsonResponse.id
            } else {
              const errorDetail = orderData.jsonResponse?.details?.[0]
              const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${orderData.jsonResponse.debug_id})`
                : JSON.stringify(orderData)

              throw new Error(errorMessage)
            }
          } catch (error) {
            const err = JSON.parse(error.message)
            console.log({
              'error.message': error.message,
              'typeof error.message': typeof error.message,
              err,
            })
            console.error(error)

            // resultMessage(
            //   `Could not initiate PayPal Checkout...<br><br>${err.jsonResponse.error_description}`
            // )
          }
        },
        async onApprove(data, actions) {
          console.log({ onApprove: data })
          try {
            const response = await fetch(`/api/paypal/capture`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: data.orderID,
              }),
            })
            let orderData = await response.json()
            orderData = orderData.jsonResponse

            console.log({ orderData })

            const errorDetail = orderData?.details?.[0]
            if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
              // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
              return actions.restart()
            } else if (errorDetail) {
              // (2) Other non-recoverable errors -> Show a failure message
              throw new Error(
                `${errorDetail.description} (${orderData.debug_id})`
              )
            } else if (!orderData.purchase_units) {
              // Error 3
              throw new Error(JSON.stringify(orderData))
            } else {
              // Success
              const transaction =
                orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                orderData?.purchase_units?.[0]?.payments?.authorizations?.[0]

            //   resultMessage(
            //     `Transaction ${transaction.status}: ${transaction.id}<br><br>Sending Email`
            //   )
              console.log(
                'Capture result',
                orderData,
                JSON.stringify(orderData, null, 2)
              )
            //   processSuccessfulClassPayment(orderData, transaction)
            }
          } catch (error) {
            console.log(error)
            console.error(error)
            // resultMessage(
            //   `Sorry, your transaction could not be processed...<br><br>${error}`
            // )
          }
        },
      })
      .render('.payPalContainer')
}