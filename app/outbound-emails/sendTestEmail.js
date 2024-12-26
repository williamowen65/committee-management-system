export function  sendTestEmail(){
    
    // const email = prompt("Enter an email address to send the test email", firebase.auth.currentUser.email)
    // if (!email) return

    const email = 'william.owen.dev@gmail.com'

    window.sendMessageToParent({
      controller: 'gmailController', to: email, subject: 'Test Email', body: `
  
      hi

          `
    })
}