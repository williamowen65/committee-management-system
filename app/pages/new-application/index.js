document.addEventListener('DOMContentLoaded', function() {
    const form  = document.querySelector('form#new-application-form')
    console.log({form, CRUD})

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const { values, form } = getFormValues('form#new-application-form')
        console.log({ values, form })

        values.hasBeenReviewed = false

        // Process images
        // Get urls
        // Update data to have urls instead of files
        // Save data to firebase

        const promises = Object.entries(values).map(([key, value]) => {
            if (value instanceof File) {
                return new Promise((resolve, reject) => {
                    CRUD.saveImage(value).then(url => {
                        values[key] = url
                    }).then(() => {
                        resolve()
                    }).catch((err) => {
                        reject(err)
                    })
                })
            }
        })
        
        /**
         * Potential enhancements... Don't redirect.
         * after save, record the id.. If applicant re-save, just update the record
         */


        Promise.all(promises).then(() => {  
            CRUD.create('new-applications', values).then(() => {
                alert('Your application has been submitted successfully!')
                location.href = 'https://gigharboropenstudiotour.org/'
            })
        })
    })
})