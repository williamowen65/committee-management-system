
/**
  payload:{
    controller: 'gmailController',
    to: string,
    subject: string,
    body: string
  }
 */
  function gmailController(payload) {
    console.log("gmailController", { payload })

    // console.log("Services available ", {Gmail, Docs, Sheets, Drive, MailApp})

    // This time stamp is a work around to prevent the https://stackoverflow.com/questions/11078264/how-to-get-rid-of-show-trimmed-content-in-gmail-html-emails
    var timestamp = new Date().toISOString();
    MailApp.sendEmail({
        to: payload.to,
        subject: payload.subject,
        htmlBody: payload.body + `<p class="timestamp" style="opacity: 0; user-select:none">[${timestamp}] End of message.</p>`
    });

    return { status: 'success', message: 'Email sent' };
}
