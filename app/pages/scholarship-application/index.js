import '../../../utils/logIf.js';

document.addEventListener('DOMContentLoaded', function () {
    let existingApplication = {}

    // Populate the name field with first and last name from user profile
    firebase.auth.onAuthStateChanged(function (user) {
        CRUD.read('ghost-contracts', user.uid).then((contract) => {
            console.log({ contract })
            if (contract && contract.artistDetails) {
                const artistDetails = contract.artistDetails
                document.querySelector('input[id="name"]').value = artistDetails.firstName + ' ' + artistDetails.lastName
                // trigger change event to show the name label
                document.querySelector('input[id="name"]').dispatchEvent(new Event('change'))
            }
        })
        CRUD.read('scholarship-applications', user.uid).then((application) => {
            if (Object.keys(application.length !== 0)) {
                existingApplication = application
                document.querySelector('input[id="name"]').value = application.name || user.displayName
                document.querySelector('input[id="name"]').dispatchEvent(new Event('change'))
                document.querySelector('input[id="email"]').value = application.email || ''
                document.querySelector('input[id="email"]').dispatchEvent(new Event('change'))
                document.querySelector('input[id="hasNotReceivedScholarship"]').checked = application.hasNotReceivedScholarshipPreviously || false;
                document.querySelector('textarea[id="needForScholarship"]').value = application.needForScholarship || ""
                document.querySelector('textarea[id="needForScholarship"]').dispatchEvent(new Event('change'))
            }
        })   
    })


    // Handle submit event for scholarship application form
    document.querySelector('form#scholarship-application').addEventListener('submit', function (e) {
        e.preventDefault();

        const form = this;

        // get the button
        const btnSubmit = form.querySelector('button[type="submit"]')

        // get the button text
        const btnText = btnSubmit.innerText
        // change the button text to loading
        btnSubmit.innerText = 'Loading...'
        // disable the button
        btnSubmit.disabled = true

        const name = form.querySelector('input[id="name"]').value;
        const email = form.querySelector('input[id="email"]').value;
        const hasNotReceivedScholarshipPreviously = form.querySelector('input[id="hasNotReceivedScholarship"]').checked;
        const needForScholarship = form.querySelector('textarea[id="needForScholarship"]').value;

        // save to firebase (by membership Id -- unlike the normal applications page)
        CRUD.update('scholarship-applications', firebase.auth.currentUser.uid, {
            name,
            email,
            hasNotReceivedScholarshipPreviously,
            needForScholarship,
            hasBeenReviewed: existingApplication.hasBeenReviewed || false,
            // scholarshipGranted: false, // defined by reviewer
            createdAt: firebase.serverTimestamp(),
        }).then(() => {

            sendNewScholarshipEmail({
                name,
            })
            // change the button text back to original
            btnSubmit.innerText = "Your scholarship application has been submitted successfully!"
            // enable the button
            btnSubmit.disabled = false
            // show success message
            setTimeout(() => {
                location.href = 'https://gigharboropenstudiotour.org/'
            }, 3000)
        }).catch((err) => {
            // change the button text back to original
            btnSubmit.innerText = btnText
            // enable the button
            btnSubmit.disabled = false
            // show error message
            logIf.client && console.log({ err })
            alert('There was an error submitting your scholarship application. Please try again')
        });
    });
});
