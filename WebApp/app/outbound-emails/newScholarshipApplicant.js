import { getEmailAddresses } from './getEmailAddresses.js';
import {TESTING} from './sendTestEmail.js'

export async function sendNewScholarshipEmail(user){

    const artistName = user.name
    // get all board members
    // plus new artist applications chair
    // new artist recruitment chair


    const newScholarshipEventId = 'aQJKYbbkaNgK3sef3rIp' // A timeline event id for some date in the future
    const specialTimelineEvent  = await CRUD.read('ghost-timeline', newScholarshipEventId)

    let date;
    if(typeof specialTimelineEvent.date === 'string'){
        // parse date
        const [year, month, day] = specialTimelineEvent.date.split('-');
        date = new Date(year, month - 1, day); 
        date = date.toLocaleDateString('en-us', {month: 'long', day: 'numeric'})
    } else {
        date = specialTimelineEvent.date.toDate().toLocaleDateString('en-us', {month: 'long', day: 'numeric'})
    }

    const emailAddresses = await getEmailAddresses({  
        roles: ["24", "15"], // new applications chair, new recruitment chair
        committees: ['Board'],
     }).then(emails => emails.join(',') + ',' + user.email)

    if(TESTING.newScholarship) console.log("Would send email to: ", emailAddresses)

    window.sendMessageToParent({
        controller: 'gmailController',
        to: TESTING.newScholarship ? 'william.owen.dev@gmail.com' : emailAddresses,
        // every one on board, new artist applications chair, new artist recruitment chair and the person who applied
    //   to: ""
        subject: `GHOST New scholarship Application sent from ${artistName}`,
        body: `
         <div style="text-align:center">
          <h1>A GHOST New scholarship Application has been submitted!</h1>
            <p>
            The committee will be reviewing the application from <b>${artistName}</b>.<br>
            The new artist applicant will receive a notification once the application has been reviewed. 
            </p>
            <p>The scholarship must be received no later than ${date}.
            </p>


            <p>Thank you for your membership.</p>
            <p>Best Regards, <br>Gig Harbor Open Studio Tour</p>
        </div>
          `
      })

}