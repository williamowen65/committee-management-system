export function sendNewApplicationEmail(values){

    const newArtist = values
    // get all board members
    // plus new artist applications chair
    // new artist recruitment chair

    const newApplicationEventId = '1Iig2hZFN7MgyFUpjG0q'
    const specialTimelineEvent  = await CRUD.read('ghost-timeline', newApplicationEventId)

    window.sendMessageToParent({
        controller: 'gmailController',
        // every one on board, new artist applications chair, new artist recruitment chair and the person who applied
    //   to: ""
        to: 'bluekayak123@yahoo.com, william.owen.dev@gmail.com', // <---TESTING
        subject: `GHOST New Artist Application sent from ${newArtist.firstName} ${newArtist.lastName}`,
        body: `
         <div style="text-align:center">
          <h1>A GHOST New Artist Application has been submitted!</h1>
            <p>
            The committee will be reviewing the application.<br>
            The new artist applicant, ${newArtist.firstName} ${newArtist.lastName}, will receive a notification after the application has been reviewed. 
            <br>
            Application must be reviewed no later than ${specialTimelineEvent.date.toDate().toLocaleDateString('en-us', {month: 'long', day: 'numeric'})}.
            </p>


            <p>Thank you for your membership.</p>
            <p>Best Regards, <br>Gig Harbor Open Studio Tour</p>



        </div>
          `
      })

}