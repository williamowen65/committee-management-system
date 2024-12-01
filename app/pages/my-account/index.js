document.addEventListener('DOMContentLoaded', function() {
    // capture form submit
    document.getElementById('my-account-form').addEventListener('submit', function(e) {

        e.preventDefault();
        // get form data
        var form = document.getElementById('my-account-form');
        var formData = new FormData(form);
        console.log('form submitted', {form, formData, entries: formData.entries()});
        
        // log form data
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

    })
});