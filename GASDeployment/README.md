This repo is crazy with use of git. 
I tried to configure git to work such that some file were merged and other files belonged to specific branches.
This configuration didn't work.

So instead I am taking an approach of nesting* git repos.

google-server is it's own git repo. It can be used with any project. 
Code updates can easily be merged into other projects and pushed.


server-configruation is it's own repo (not yet initialized* since I haven't figured out nesting of git repos)
which contains another git repo... (google-server)
but also contains the files that make this project unique
SPECIFICALLY server-configuration/deployment-management.js 
which has ONE-LINE of code. (Glitch server name)
AND the server-configuration/package.json file
Which also has ONE-LINE of code... (GAS project Id)

To push updates to the the Google server for this project, run 
`npm run push` in the terminal.

The server files are located next to App Specific files, which are hosted on glitch.

The server files within google-server control the iframe "API" from app to google. 

google-server/controllers ... 
DocumentApp, DriveApp, GMailApp, Sheets
APIs for these tools

google-server/domain-management
A folder meant to be deployed on Netlify
This is for the URL to be customized
It also contains logic communicated via iframe "API"
to control the linking of the nested url and the main window url.
It shouldn't have to be messed with, but this version was designed for this GHOST project,
so it may need tinkering for another app.