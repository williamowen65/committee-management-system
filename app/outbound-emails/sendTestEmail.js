export function  sendTestEmail(){
    
    const email = prompt("Enter an email address to send the test email", firebase.auth.currentUser.email)
    if (!email) return

    window.sendMessageToParent({
      controller: 'gmailController', to: email, subject: 'Test Email', body: `
      <div style="text-align:center">
      <h1>Congratulations on joining the <br>Gig Harbor Open Studio Tour</h1>
          <p>Here is your invoice for the membership fee</p>
          <fieldset style="width:fit-content; margin: auto;">
          <legend>Invoice</legend>
          <p style="margin:0;">Transaction ID: 123</p>
          <p style="margin:0;">Amount: 123}</p>
          <p style="margin:0;">Currency:USD</p>
          <p style="margin:0;">Status: complete </p>
          <p style="margin:0;">Created At: ${new Date().toLocaleString()}</p>
          </fieldset>
          <p>Thank you for your membership payment.</p>
          <p>Best Regards, <br>Gig Harbor Open Studio Tour</p>
      <div>

          `
    })
}