# GHOST Committee

> Gig Harbor Open Studio Tour

This is a project for a local community of artist in Gig Harbor. It is deployed on it's own server, but bound to an existing SquareSpace website via anchor links.

---

### The requirements for the project were:

- Workflow automation where members can electronically fill out contracts. 
  - Contracts can be processed into PDFs
  - Contracts can be edited up to a specific date
  - Contracts contain a real-time "Committee Role" self-assignment section
  - Contracts are integrated with a PayPal checkout solution
    - The checkout can accept a automated discount
- Community members can apply to join GHOST
  - New applications are reviewed by contract members with the Role: President or Applicant Review Chair
- GHOST members can apply for scholarships
  - The can edit their application 
  - The scholarships can be reviewed by GHOST board members

- Gmail and Google Sheets integrations
  - This integration requires a Google Workspace for a minimum of $6/month.
    - Google Workspaces require owning a domain. (SquareSpace has a solution for verification)

---

### Project Structure

```
app/
    api/
        paypal/ <-- Served from server.js
    cloudFunctions/
        google/  <--- Deploy to GCP with 'npm run deploy:gcf:googleapis'
    components/ <--- Encapsulations of styles & logic (custom html components)
        3rdParty/
        application/
        dual-login-form/
        footer/
        header/
        input/
        markdown/
        scholarship-application/
        component-build.js   <----- webpack.components.config.js points to this
    firebase.rules  <-- txt files
    pages/ <---- Pages served from server.js dynamically
        artist-sign-on/
        members/
        my-contract/
        new-application/
        new-applications/
        scholarship-application/
        scholarship-applications/
    styles.scss
dist/     <---- STATIC FOLDER
    assets/
    components.js <----- webpack.components.config.js builds this
    CRUD.js  <--- Encapsulated database api
    firebase.js  <--- Database/Image storage
    styles.css <-- Built by running 'npm run watch:scss'
utils/
    custom-element.js  <--- Core file for creating custom elements.
    logIf.js  <--- A Global Constant for handling logs.
server.js  <--- Serves all content (Entry point). Run with 'npm run start:w'
watch.json <--- Config file (hosted on Glitch)
webpack.components.config.js  <--- Run with 'npm run build:w'

```

### Google Workspace Integration Steps 




To set up email functionality alongside other Google APIs using a **service worker** (likely referring to a backend service or middleware with Google APIs), follow these steps:

---

### **1. Set Up a Google Cloud Project**
To use Google APIs programmatically, you need a Google Cloud project:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. **Create a New Project**:
   - Give your project a name.
3. **Enable Gmail API**:
   - In the Cloud Console, navigate to **APIs & Services** > **Library**.
   - Search for **Gmail API** and enable it.

---

### **2. Set Up Service Account for Authentication**
Service accounts allow secure, programmatic access to Google APIs:
1. **Create a Service Account**:
   - Go to **IAM & Admin** > **Service Accounts**.
   - Click **Create Service Account**.
   - Assign it a role (e.g., **Editor**, or custom roles based on API needs).
2. **Generate a Key**:
   - After creating the service account, generate a JSON key file.
   - Download and save this securely. You'll use it in your app.

---

### **3. Delegate Domain-Wide Access (For Gmail API)**

> - You first need to create the workspace account   
>   - Requires owning a domain (https://gigharboropenstudiotour.org/) and going through the workspace verification process

To send emails on behalf of users in your domain: (Our emails will be from ghost@gigharboropenstudiotour.org)
1. **Go to Admin Console**:
   - Visit the [Google Admin Console](https://admin.google.com/).
2. **Security > API Controls > Domain-Wide Delegation**:
   - Add your service account's client ID (from the JSON key file).
   - Add required OAuth scopes for Gmail:
     ```
     https://www.googleapis.com/auth/gmail.send
     ```

---

### **4. Write a Service Worker Script**
Use the Gmail API to send emails programmatically:
#### Example: Node.js Service Worker

1. **Install Required Libraries**:
   ```bash
   npm install googleapis nodemailer
   ```

2. **Service Worker Code**:
   ```javascript
   const { google } = require('googleapis');
   const nodemailer = require('nodemailer');
   const fs = require('fs');

   // Load service account JSON
   const keyFilePath = './service-account-key.json'; // Replace with your key file
   const auth = new google.auth.GoogleAuth({
     keyFile: keyFilePath,
     scopes: ['https://www.googleapis.com/auth/gmail.send'],
   });

   async function sendEmail() {
     const authClient = await auth.getClient();
     const gmail = google.gmail({ version: 'v1', auth: authClient });

     const email = [
       'To: recipient@example.com',
       'Subject: Test Email from Gmail API',
       '',
       'Hello! This is a test email.',
     ].join('\n');

     const encodedMessage = Buffer.from(email)
       .toString('base64')
       .replace(/\+/g, '-')
       .replace(/\//g, '_')
       .replace(/=+$/, '');

     await gmail.users.messages.send({
       userId: 'me',
       requestBody: {
         raw: encodedMessage,
       },
     });

     console.log('Email sent!');
   }

   sendEmail().catch(console.error);
   ```

---

### **5. Use Other Google APIs**
With the same service account setup, you can integrate other Google APIs (e.g., Sheets, Drive, Calendar). Adjust the **scopes** in your authentication setup to include the relevant APIs.

---

### **6. Deploy the Service Worker**
Deploy the script to a server or platform, such as:
- **Node.js Server** (e.g., Express)
- **Google Cloud Functions** or **App Engine**
- **Glitch** (you’re already using it)

---

### **7. Testing**
1. **Domain-Wide Delegation**:
   - Ensure your service account is allowed to send emails on behalf of users.
2. **Email Output**:
   - Test by sending a sample email and monitor logs for errors.

Let me know if you need further customization or help setting up additional APIs!
