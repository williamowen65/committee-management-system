document.addEventListener('DOMContentLoaded', function () {

    console.log("My Contract Page Loaded")

    // set listeners on forms
    const listeners = {
        'my-signature-form': handleSignatureForm,
        'artist-details-form': handleArtistDetailsForm,
        'digital-images-form': handleDigitalImagesForm,
        'studio-sharing-form': handleStudioSharingForm,
        'volunteer-responsibility-form': handleVolunteerResponsibilityForm,
        'artistic-demonstration-form': handleArtisticDemonstrationForm,
    }
    Object.keys(listeners).forEach(key => {
        const form = document.querySelector(`form#${key}`)
        if (form) {
            form.addEventListener('submit', listeners[key])
        }
    })




})

// Helper function to get form values
function getFormValues(formSelector) {
    const form = document.querySelector(formSelector);
    const formData = new FormData(form);
    return {
        form, values: Object.fromEntries(formData.entries())
    }
}



function handleSignatureForm(e) {
    e.preventDefault();
    const { values, form } = getFormValues('form#my-signature-form')
    console.log({ values, form })
}


function handleArtistDetailsForm(e) {
    e.preventDefault();
    const { values, form } = getFormValues('form#artist-details-form')
    console.log({ values, form })
    // Get form

}
function handleDigitalImagesForm(e) {
    e.preventDefault();

    const { values, form } = getFormValues('form#digital-images-form')
    console.log({ values, form })

}
// This form is unique. It should return a single string which compiles a sentence based on the form values 
/*
"I have my own studio space within the GHOST tour boundaries.... 
I do not have room for additional artists. 
I am willing to show my art at another artist's studio space, even though I have my own studio. 
I don’t have my own art canopy so would need a covered space (ie, a garage or indoors) to set up"
*/
function handleStudioSharingForm(e) {
    e.preventDefault();
    const form = document.querySelector('form#studio-sharing-form')

    // Get first string (aka "studioPreference")
    const studioPreference = form.querySelector('input[name="studioPreference"]:checked')
    let StudioSharingAnswer = studioPreference.parentNode.innerText;
    const option1Selected = StudioSharingAnswer.includes('I have my own studio space')
    // Get second string based on studioPreference 
    if (option1Selected) {
        const studioAvailability = form.querySelector('input[name="studioAvailability"]:checked')
        let studioAvailabilityAnswer = studioAvailability.parentNode.innerText;
        // append answer to string result
        StudioSharingAnswer += ' \n\t' + studioAvailabilityAnswer;

        // Check for type of answer  "I can share my studio space"
        const subOption2Selected = studioAvailabilityAnswer.includes('I can share my studio space')
        if (subOption2Selected) {
            // get how many artists can be accommodated
            const artistsAccommodated = form.querySelector('textarea[name="studioSharingInfo"]')
            StudioSharingAnswer += ' \n\t\t' + artistsAccommodated.value.trim();
            
            // get plans to share studio space
            const studioSharingPlans = form.querySelector('textarea[name="studioSharingPlans"]')
            StudioSharingAnswer += ' \n\t\t' + studioSharingPlans.value.trim();
        }



        // Check for willingness to relocate
        const willingnessToRelocate = form.querySelector('input[name="willingnessToRelocate"]:checked')
        if (willingnessToRelocate) {
            StudioSharingAnswer += ' \n\t' + willingnessToRelocate.parentNode.innerText;

            // find canopy preference 
            const canopyPreference = form.querySelector('input[name="canopy-studio"]:checked')
            if (canopyPreference) {
                StudioSharingAnswer += ' \n\t\t' + canopyPreference.parentNode.innerText;
            }

        }



    } else { // option 2 selected "I don't have a studio"
        // Get canopy info
        const canopyPreference = form.querySelector('input[name="canopy-no-studio"]:checked')
        StudioSharingAnswer += ' \n\t' + canopyPreference.parentNode.innerText;

    }

    console.log({ StudioSharingAnswer })


    // const {values, form} = getFormValues('form#studio-sharing-form')
    // console.log({values, form})


}


function handleVolunteerResponsibilityForm(e) {
    e.preventDefault();

    const { values, form } = getFormValues('form#volunteer-responsibility-form')
    console.log({ values, form })
}

function handleArtisticDemonstrationForm(e) {
    e.preventDefault();

    const { values, form } = getFormValues('form#artistic-demonstration-form');

    console.log({ values, form })

}


