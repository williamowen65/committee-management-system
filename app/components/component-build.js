import '../styles.scss'  // Import the styles (These are really the global styles for the app -- They could have their own web pack config)
import "./input/index.js";
import "./header/index.js";
import "./markdown/index.js";
import "./dual-login-form/index.js";
import "./dual-login-form/global.scss"
import "./footer/index.js";
import "./3rdParty/paypal/index.js";
import './application/index.js'
import './scholarship-application/index.js'
import '../../utils/logIf.js'
import './contract-received/index.js'
import logIf from '../../utils/logIf.js';


// global google services api
// import "../../lib/google.js";


// Globals file
// Helper function to get form values
window.getFormValues = function (formSelector) {
    logIf.client && console.log("Getting form values and about to set loading")
    const form = document.querySelector(formSelector);
    const formData = new FormData(form);
    setLoading(form, true)
    return {
        form, values: Object.fromEntries(formData.entries())
    }
}

// global function to set loading state
window.setLoading = function (form, isLoading, config = { success: true, cbText: "Your changes have been saved" }) {
    if (!config.success) return; // Don't set loading if there was an error
    logIf.client && console.log("Setting loading", { form, isLoading, config })
    const submitButton = form.querySelector('button[type="submit"]')
    if (isLoading) {
        // get submit button text 
        const text = submitButton.innerHTML
        submitButton.setAttribute('disabled', 'disabled')
        submitButton.innerHTML = 'Loading...'
        submitButton.setAttribute('data-text', text);
    } else {

        submitButton.innerHTML = config.cbText
        setTimeout(() => {
            submitButton.removeAttribute('disabled')
            const text = submitButton.getAttribute('data-text')
            submitButton.innerHTML = text
        }, 3000)

    }
}


/**
 * navigateTo is a method for changing the main url from a nested iframe
 * But in development, it will just change the url of the current window since there is not iframe
 * @param {*} path 
 */
window.navigateTo = function (path) {

    const isDevEnv = window.location.origin.includes('localhost')

    if (isDevEnv) {
        // go to the new path
        window.location.href = window.location.origin + path
    } else {
        var message = {
            dispatch: 'navigate',
            path: path
        };
        // This line update the main window with the new path
        window.top.postMessage(message, '*');
    }
}

window.openUrl = function (url) {
    const isDevEnv = window.location.origin.includes('localhost')

    if (isDevEnv) {
        // go to the new path
        window.location.href = url
    } else {
        var message = {
            dispatch: 'openUrl',
            path: url
        };
        // This line update the main window with the new path
        window.top.postMessage(message, '*');
    }
}


