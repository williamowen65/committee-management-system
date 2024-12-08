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
        const hasReceivedScholarshipPreviously = form.querySelector('input[id="hasReceivedScholarship"]').checked;
        const needForScholarship = form.querySelector('textarea[id="needForScholarship"]').value;

        // save to firebase
        CRUD.create({
            name,
            email,
            hasReceivedScholarshipPreviously,
            needForScholarship
        }).then(() => {
            // change the button text back to original
            btnSubmit.innerText = btnText
            // enable the button
            btnSubmit.disabled = false
            // show success message
            alert('Your scholarship application has been submitted successfully!')
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
