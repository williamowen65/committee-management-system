import '../../../utils/logIf.js';

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
            debugger
            CRUD.create('new-applications', values).then(() => {

                // get all board members
                // plus new artist applications chair
                // new artist recruitment chair

                window.sendMessageToParent({
                    controller: 'gmailController',
                    // every one on board, new artist applications chair, new artist recruitment chair and the person who applied
                //   to: ""
                    // to: 'bluekayak123@yahoo.com, william.owen.dev@gmail.com', // <---TESTING
                    subject: `GHOST Contract Application sent from ${newArtist.name}`,
                    body: `
                     <div style="text-align:center">
                      <h1>The Gig Harbor Open Studio Tour is Growing</h1>
                        <h2>New Artist Application Received</h2>
                        <p>Artist Name: ${newArtist.name}</p>
                        <p>Artist Email: ${newArtist.email}</p>
                        <p>Artist Phone: ${newArtist.phone}</p>
                        <p>Artist Address: ${newArtist.address}</p>
                        <p>Artist Website: ${newArtist.website}</p>
                        <p>Artist Media: ${newArtist.media}</p>
                        <p>Artist Description: ${newArtist.description}</p>
                        <p>Artist Image: <img src="${newArtist.image}" alt="Artist Image" style="max-width: 100%;"></p>
                        <p>Artist Image 2: <img src="${newArtist.image2}" alt="Artist Image 2" style="max-width: 100%;"></p>
                        <p>Artist Image 3: <img src="${newArtist.image3}" alt="Artist Image 3" style="max-width: 100%;"></p>
                        <p>Artist Image 4: <img src="${newArtist.image4}" alt="Artist Image 4" style="max-width: 100%;"></p>
                        <p>Artist Image 5: <img src="${newArtist.image5}" alt="Artist Image 5" style="max-width: 100%;"></p>



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