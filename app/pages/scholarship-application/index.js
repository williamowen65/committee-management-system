document.addEventListener('DOMContentLoaded', function () {


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

        // save to firebase
        CRUD.create('scholarship-applications', {
            name,
            email,
            hasNotReceivedScholarshipPreviously,
            needForScholarship
        }).then(() => {
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
            console.log({ err })
            alert('There was an error submitting your scholarship application. Please try again')
        });
    });
});
