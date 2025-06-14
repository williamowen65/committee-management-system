/**
 * This is a Google Apps Script project
 * deployed via google sheets as a web app (doGet/doPost - https://developers.google.com/apps-script/guides/web)
 * 
 * This file the entry point for the request.
 * It will call the appropriate controller function based on the request path.
 * 
 * sheets, docs, drive, gmail
 * 
 * The App requires: 
 * 
 * Export all data to google sheets
 * Export contracts to PDFs
 * Save all images to a google drive folder
 * Integrate with Gmail to send emails (Implemented: Contract submission email)
 * 
 * 
 */


function doGet(e) {

    console.log("doGet", e)
    // return html content

    return HtmlService.createHtmlOutput(`
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Full Screen Iframe</title>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <iframe src="${getDeploymentSource()}${e.parameter.path || ""}"></iframe>
    <script>

     
        


        var iframe = document.querySelector('iframe');
        window.addEventListener('message', function(event) {
            // Validate the origin of the message
            if (event.origin !== '${getDeploymentSource()}') {
                return;
            }


            // set path route
            var path = event.data.path;
            console.log('Received message from iframe:', event);


            var data = event.data;
            console.log('Received message from iframe:', data);
            // Handle the received data

            if(data.controller === 'gmailController') {
                google.script.run.withSuccessHandler(function(resultData) {
                    var message = { 
                        dispatch: data.controller + "-response",
                        data: resultData
                        }; // Replace with your actual data
                        console.log('Controller Success:', {data, message});
                    iframe.contentWindow.postMessage(message, '*');
                }).withFailureHandler(function(error) {
                    var message = { 
                        dispatch: data.controller + "-response",
                        error
                        }; // Replace with your actual data
                        console.error('Controller Error:', {error, message});
                    iframe.contentWindow.postMessage(message, '*');
                }).gmailController(data);
            }

            if(data.controller === 'sheetsController') {
                google.script.run.withSuccessHandler(function(resultData) {
                    var message = { 
                        dispatch: data.controller + "-response",
                        data: resultData
                        }; // Replace with your actual data
                        console.log('Controller Success:', {data, message});
                    iframe.contentWindow.postMessage(message, '*');
                }).withFailureHandler(function(error) {
                    var message = { 
                        dispatch: data.controller + "-response",
                        error
                        }; // Replace with your actual data
                        console.error('Controller Error:', {error, message});
                    iframe.contentWindow.postMessage(message, '*');
                }).sheetsController(data);
            }

            if(data.controller === 'driveController') {
                google.script.run.withSuccessHandler(function(resultData) {
                    var message = { 
                        dispatch: data.controller + "-response",
                        data: resultData
                        }; // Replace with your actual data
                        console.log('Controller Success:', {data, message});
                    iframe.contentWindow.postMessage(message, '*');
                }).withFailureHandler(function(error) {
                    var message = { 
                        dispatch: data.controller + "-response",
                        error
                        }; // Replace with your actual data
                        console.error('Controller Error:', {error, message});
                    iframe.contentWindow.postMessage(message, '*');
                }).driveController(data);
            }

            if(data.controller === 'docsController') {
                google.script.run.withSuccessHandler(function(resultData) {
                    var message = { 
                        dispatch: data.controller + "-response",
                        data: resultData
                        }; // Replace with your actual data
                        console.log('Controller Success:', {data, message});
                    iframe.contentWindow.postMessage(message, '*');
                }).withFailureHandler(function(error) {
                    var message = { 
                        dispatch: data.controller + "-response",
                        error
                        }; // Replace with your actual data
                        console.error('Controller Error:', {error, message});
                    iframe.contentWindow.postMessage(message, '*');
                }).docsController(data);
            }
     
        });

        // send a test message to the iframe
        var iframe = document.querySelector('iframe');
        iframe.onload = function() {
            console.log("Iframe loaded: ", iframe.src);
            var message = { key: 'value' }; // Replace with your actual data
            iframe.contentWindow.postMessage(message, '*');
        };

  


     
    </script>
</body>
</html>
    `).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}










