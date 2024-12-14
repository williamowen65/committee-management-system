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