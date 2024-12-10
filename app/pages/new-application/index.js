document.addEventListener('DOMContentLoaded', function() {
    const form  = document.querySelector('form#new-application-form')
    console.log({form, CRUD})

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const { values, form } = getFormValues('form#new-application-form')
        console.log({ values, form })

       
        CRUD.create('new-applications', values).then(() => {
            alert('Your application has been submitted successfully!')
        })
    })
})