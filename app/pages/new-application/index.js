import '../../../utils/logIf.js';

document.addEventListener('DOMContentLoaded', function() {
    const form  = document.querySelector('form#new-application-form')
    logIf.client && console.log({form, CRUD})

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const { values, form } = getFormValues('form#new-application-form')
        logIf.client && console.log({ values, form })

        values.hasBeenReviewed = false

        // Process images
        // Get urls
        // Update data to have urls instead of files
        // Save data to firebase

        const promises = Object.entries(values).map(([key, value]) => {
            if (value instanceof File) {
                return new Promise((resolve, reject) => {
                    CRUD.saveImage(value, 'new-applications').then(url => {
                        values[key] = url
                    }).then(() => {
                        resolve()
                    }).catch((err) => {
                        reject(err)
                    })
                })
            }
        })
        
        /**
         * Potential enhancements... Don't redirect.
         * after save, record the id.. If applicant re-save, just update the record
         */


        Promise.all(promises).then(() => {  
            CRUD.create('new-applications', values).then(() => {

                // get all board members
                // plus new artist applications chair
                // new artist recruitment chair

                window.sendMessageToParent({
                    controller: 'gmailController',
                    // To all the board member and artist images chair emails
                    to: welcomeEmailAddress,
                    // to: 'bluekayak123@yahoo.com, william.owen.dev@gmail.com', // <---TESTING
                    subject: `GHOST Contract Payment Submitted by ${newArtist.name}`,
                    body: `
                     <div style="text-align:center">
                      <h1>The Gig Harbor Open Studio Tour is Growing</h1>
                      <p>${newArtist.name} has submitted their membership payment.
                      <br> Reach out to them to welcome them to the tour.
                      <br> You can reach them at ${newArtist.email}
                       </p>
                    
                      <fieldset style="width:fit-content; margin:auto;">
                      
                      <legend>Invoice</legend>
                      
                      <p style="margin:0; text-align:start;">Transaction ID: ${transaction.id}</p>
                      <p style="margin:0; text-align:start;">Amount: ${transaction.amount.value}</p>
                      <p style="margin:0; text-align:start;">Currency: ${transaction.amount.currency_code}</p>
                      <p style="margin:0; text-align:start;">Status: ${transaction.status}</p>
                      <p style="margin:0; text-align:start;">Created At: ${new Date().toLocaleString()}</p>
                      </fieldset>
    
                      <p>Thank you for your membership.</p>
                       <p>Best Regards, <br>Gig Harbor Open Studio Tour</p>
                    </div>
                      `
                  })
    
    
    
                  window.addEventListener("message", (event) => {
                    // if (event.data.dispatch !== 'gmailController-response') return
    
                    // if (event.data.error) {
                    //   document.querySelector('.processPayment').innerText = "<div style='color:red; font-weight: bold'>Payment successful but error sending email</div>"
                    //   return
                    // }
    
                    // // You can add additional logic here to handle the message
                    // // show success message
    
                    // document.querySelector('.processPayment').innerText = "Payment Successful - Email Sent"
    
                    // setTimeout(() => {
                    //   // redirect to the dashboard
                    //   window.location.href = '/members'
                    // }, 3000)
                  });

            }).then(() => {
                const button = document.querySelector('button[type="submit"]')
                button.innerText = 'Application Submitted!'
                setTimeout(() => {
                    location.href = 'https://gigharboropenstudiotour.org/'
                }, 3000)
            })
        })
    })
})