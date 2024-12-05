import '../styles.scss'  // Import the styles (These are really the global styles for the app -- They could have their own web pack config)
import "./input/index.js";
import "./header/index.js";
import "./markdown/index.js";
import "./dual-login-form/index.js";
import "./footer/index.js";


// global google services api
// import "../../lib/google.js";


// Globals file
// Helper function to get form values
window.getFormValues = function(formSelector) {
    console.log("Getting form values and about to set loading")
    const form = document.querySelector(formSelector);
    const formData = new FormData(form);
    setLoading(form, true)
    return {
        form, values: Object.fromEntries(formData.entries())
    }
}

// global function to set loading state
window.setLoading = function(form, isLoading) {
    console.log("Setting loading", { form, isLoading })
    const submitButton = form.querySelector('button[type="submit"]')
    if (isLoading) {
        // get submit button text 
        const text = submitButton.innerHTML
        submitButton.setAttribute('disabled', 'disabled')
        submitButton.innerHTML = 'Loading...'
        submitButton.setAttribute('data-text', text);
    } else {
        submitButton.removeAttribute('disabled')
        const text = submitButton.getAttribute('data-text')
        submitButton.innerHTML = text
    }
}