import '../../../utils/logIf.js';
import { sendNewApplicationEmail } from '../../outbound-emails/newApplicationReceived.js';

document.addEventListener('DOMContentLoaded', function() {
    const form  = document.querySelector('form#new-application-form')
    logIf.client && console.log({form, CRUD})

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const { values, form } = getFormValues('form#new-application-form')
        logIf.client || true && console.log({ values, form })
       

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
            CRUD.create('new-applications', values).then(async () => {

                sendNewApplicationEmail(values)

    
    
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