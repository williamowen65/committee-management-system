document.addEventListener('DOMContentLoaded', function() {
    console.log("my account page loaded");

    // capture form submit
    document.getElementById('my-account-form').addEventListener('submit', function(e) {

        e.preventDefault();
        const { values, form } = getFormValues('form#my-account-form')
        console.log({ values, form })
        // Get form
        setLoading(form, false)

    })
});