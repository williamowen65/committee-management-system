// import roles from "/committee-roles.js";

export function sendNewContractSubmissionEmail(user, transaction){
    
    const personalEmail = user.artistDetails.personalEmail || ""
    const businessEmail = user.artistDetails.businessEmail || ""
    const email = firebase.auth.currentUser.email

    window.sendMessageToParent({
      controller: 'gmailController',
      to: `${email}, ${personalEmail}, ${businessEmail}`,
      subject: 'GHOST Contract Invoice',
      body: `
       <div style="text-align:center">
        <h1>Congratulations on joining the Gig Harbor Open Studio Tour</h1>
        <p>Here is your invoice for the membership fee. 
        <br> Your contract has been submitted. 
        <br> You will be able to make changes to the contract up until March 2nd, 2025
         </p>
      
        <fieldset style="width:fit-content; margin:auto;">
        
        <legend>Invoice</legend>
        
        <p style="margin:0; text-align:start;">Transaction ID: ${transaction.id}</p>
        <p style="margin:0; text-align:start;">Amount: ${transaction.amount.value}</p>
        <p style="margin:0; text-align:start;">Currency: ${transaction.amount.currency_code}</p>
        <p style="margin:0; text-align:start;">Status: ${transaction.status}</p>
        <p style="margin:0; text-align:start;">Created At: ${new Date().toLocaleString()}</p>
        </fieldset>

        <p>Thank you for your membership payment.</p>
         <p>Best Regards, <br>Gig Harbor Open Studio Tour</p>
      </div>
        `
    })
}

export async function sendNewContractSubmissionBoardEmail(user, transaction){
    
    const contracts  = await CRUD.readAll('ghost-contracts')

    const email = user.artistDetails.personalEmail || user.artistDetails.businessEmail || firebase.auth.currentUser.email




    const newArtist = {
        name: `${user.artistDetails.firstName} ${user.artistDetails.lastName}`,
        email: email
      }
      const ghostBoardMemberRoleKeys = Object.entries(roles).filter(([key,role]) => {
        if(role.committee == 'Board') return key
      }).filter(Boolean)

      const ghostArtistImagesChairRoleKeys = Object.entries(roles).filter(([key,role]) => {
        if(role.title == 'Artist Images Chair') return key
      }).filter(Boolean)

      const ghostBoardMemberEmails = contracts.filter(contract => {
        if(ghostBoardMemberRoleKeys.includes(contract.role)) return contract.artistDetails.personalEmail
      }).filter(Boolean)

      const ghostArtistImagesChairEmails = contracts.filter(contract => {
        if(ghostArtistImagesChairRoleKeys.includes(contract.role)) return contract.artistDetails.personalEmail
      }).filter(Boolean)

      // To all the board member and artist images chair emails
      const welcomeEmailAddress = ghostBoardMemberEmails.concat(ghostArtistImagesChairEmails).join(',')

      window.sendMessageToParent({
        controller: 'gmailController',
        // To all the board member and artist images chair emails
        // to: welcomeEmailAddress,
        to: 'william.owen.dev@gmail.com', // <---TESTING
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
}