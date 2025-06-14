# Put some GAS on it

> That's going to be a new thing I say

Google Apps Scripts is the best way to integrate with Google services, 
and this repo is meant to abstract away what they do well with AppScript and make
for myself an API.

This repo is my solution to doing that. There was a catch to making it work and 
it bares resemblance to a russian doll. If you've ever built GAS web apps, you'd know they are iframed.
You'd also know programming the webapp within GAS is kind of clunky. 

So for another project I've created a website and deployed it. That is the first step of the russian doll.
Next I need to iframe that within a GAS web app project. Deployed correctly, you have a nested iframed project.

Next, these Iframes need to be able to communicate with each other. Because of this communication, you have an API.
This is much better than building your web app directly on GAS, because outside of GAS I can use npm libraries at ease.

```js
// Parent iframe (GAS web app)
function sendMessageToIframe() {
    var iframe = document.getElementById('myIframe');
    iframe.contentWindow.postMessage('Hello from parent iframe', '*');
}

window.addEventListener('message', function(event) {
    if (event.origin !== 'YOUR_IFRAME_ORIGIN') return;
    console.log('Message from iframe:', event.data);
});

// Child iframe (embedded website)
window.addEventListener('message', function(event) {
    if (event.origin !== 'YOUR_PARENT_ORIGIN') return;
    console.log('Message from parent:', event.data);
    event.source.postMessage('Hello from child iframe', event.origin);
});
```

This also abstracts the good things about AppScript and allows any other project to get the same benfits at ease.
All you'd have to do is drop this repo into an GAS project (and do a few tiny config steps. See an example server configuration file)

It is a way to fully utilize Google services via GAS. (Google Apps Script)
Authentication is a breeze because it is implicitly uses the project owner gmail account.

---

This project uses the following Google services: GmailApp, SpreadsheetApp, DriveApp, DocumentApp 

---

## Deployment

> Deploy from configuration repo to your gas project. See server-config README 