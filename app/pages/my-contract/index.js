import roles from './committee-roles.js'


let contracts;
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

    CRUD.readAll('ghost-contracts').then((existingContracts) => {
        contracts = existingContracts
        // Set up volunteer responsibility form 
        setUpVolunteerResponsibilityForm(contracts);

        // set the Studio Sharing form
        setUpStudioSharingForm(contracts);

        // Set the digital images form
        setDigitalImagesForm(contracts);
    })

    CRUD.listen('ghost-contracts', null, (existingContracts) => {
        contracts = existingContracts;
        updateVolunteerResponsibilityForm(contracts);
    })
})




function handleSignatureForm(e) {
    e.preventDefault();
    const { values, form } = getFormValues('form#my-signature-form')
    console.log({ values, form })
    setLoading(form, false)
}


function handleArtistDetailsForm(e) {
    e.preventDefault();
    const { values, form } = getFormValues('form#artist-details-form')
    console.log({ values, form })
    // Get form
    setLoading(form, false)

}
async function handleDigitalImagesForm(e) {
    e.preventDefault();

    const { values, form } = getFormValues('form#digital-images-form')
    console.log({ values, form })

    // save images to storage
    // Get file url and save it to firebase by image element id.
    const url = await CRUD.saveImage(values['digitalImage1'])

    // Save to firestore
    CRUD.update('ghost-contracts', firebase.auth.currentUser.uid, {
        'digitalImage1': url
    }).then(() => {  
        setLoading(form, false)
    })


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


    const StudioSharingPayload = { 
        StudioSharingAnswer: "",
        StudioSharingInfo: {
            studioPreference: "",
            studioAvailability: "",
            artistsAccommodated: "",
            studioSharingPlans: "",
            willingnessToRelocate: "",
            canopyPreference: "",
        }
     }
   
    // Get first string (aka "studioPreference")
    const studioPreference = form.querySelector('input[name="studioPreference"]:checked')
    if(!studioPreference) return formAlert("Please select an option. Do you have a studio space or not?");
    StudioSharingPayload.StudioSharingAnswer = studioPreference.parentNode.innerText;
    StudioSharingPayload.StudioSharingInfo.studioPreference = studioPreference.value;

    const option1Selected =  StudioSharingPayload.StudioSharingAnswer.includes('I have my own studio space')
    // Get second string based on studioPreference 
    if (option1Selected) {
        const studioAvailability = form.querySelector('input[name="studioAvailability"]:checked')
        if(!studioAvailability) return formAlert("Please select an option. Can you share your studio space?");
        let studioAvailabilityAnswer = studioAvailability.parentNode.innerText;
        
        // append answer to string result
        StudioSharingPayload.StudioSharingAnswer += ' \n\t' + studioAvailabilityAnswer;
        StudioSharingPayload.StudioSharingInfo.studioAvailability = studioAvailability.value;

        // Check for type of answer  "I can share my studio space"
        const subOption2Selected = studioAvailabilityAnswer.includes('I can share my studio space')
        if (subOption2Selected) {
            // get how many artists can be accommodated
            const artistsAccommodated = form.querySelector('input[name="studioSharingInfo"]')
            if(!artistsAccommodated.value) return formAlert("Please provide information on how many artists can be accommodated");
            StudioSharingPayload.StudioSharingAnswer += ' \n\t\t' + artistsAccommodated.value.trim();
            StudioSharingPayload.StudioSharingInfo.artistsAccommodated = artistsAccommodated.value;

            // get plans to share studio space
            const studioSharingPlans = form.querySelector('textarea[name="studioSharingPlans"]')
            if(!studioSharingPlans.value) return formAlert("Please provide information on how you plan to share your studio space");
            // StudioSharingAnswer += ' \n\t\t' + studioSharingPlans.value.trim();
            StudioSharingPayload.StudioSharingAnswer += ' \n\t\t' + studioSharingPlans.value.trim();
            StudioSharingPayload.StudioSharingInfo.studioSharingPlans = studioSharingPlans.value;
        }



        // Check for willingness to relocate
        const willingnessToRelocate = form.querySelector('input[name="willingnessToRelocate"]:checked')
        if (willingnessToRelocate) {
            // StudioSharingAnswer += ' \n\t' + willingnessToRelocate.parentNode.innerText;
            StudioSharingPayload.StudioSharingAnswer += ' \n\t' + willingnessToRelocate.parentNode.innerText;
            StudioSharingPayload.StudioSharingInfo.willingnessToRelocate = willingnessToRelocate.value;

            // find canopy preference 
            const canopyPreference = form.querySelector('input[name="canopy-studio"]:checked')
            if(!canopyPreference) return formAlert("Please select an option. Do you have a canopy?");
            if (canopyPreference) {
                // StudioSharingAnswer += ' \n\t\t' + canopyPreference.parentNode.innerText;
                StudioSharingPayload.StudioSharingAnswer += ' \n\t\t' + canopyPreference.parentNode.innerText;
                StudioSharingPayload.StudioSharingInfo.canopyPreference = canopyPreference.value;
            }

        }



    } else { // option 2 selected "I don't have a studio"
        // Get canopy info
        const canopyPreference = form.querySelector('input[name="canopy-no-studio"]:checked')
        if(!canopyPreference) return formAlert("Please select an option. Do you have a canopy?");
        // StudioSharingAnswer += ' \n\t' + canopyPreference.parentNode.innerText;
        StudioSharingPayload.StudioSharingAnswer += ' \n\t' + canopyPreference.parentNode.innerText;
        StudioSharingPayload.StudioSharingInfo.canopyPreference = canopyPreference.value

    }

    console.log({ StudioSharingPayload })

   



    // const {values} = getFormValues('form#studio-sharing-form')
    // console.log({values, form})

    // Save to firestore
    setLoading(form, true)
    CRUD.update('ghost-contracts', firebase.auth.currentUser.uid, StudioSharingPayload).then(() => {
        setLoading(form, false)
    })

    function formAlert(message){
        console.log("Form Alert", message)
        alert(message)
    }

}


function handleVolunteerResponsibilityForm(e) {
    e.preventDefault();

    const { values, form } = getFormValues('form#volunteer-responsibility-form')
    console.log({ values, form })
    setLoading(form, false)
}

function handleArtisticDemonstrationForm(e) {
    e.preventDefault();

    const { values, form } = getFormValues('form#artistic-demonstration-form');

    console.log({ values, form })
    setLoading(form, false)

}


function handleCheckboxChange(e) {
    const { checked, name, value: roleId } = e.target
    const userId = firebase.auth.currentUser.uid
    const existingRoles = contracts.find(contract => contract.userId === userId)?.committeeRoleId || []

    // Set limit to 2 roles
    if (checked && existingRoles.length >= 2) {
        e.target.checked = false
        return alert("You can only select 2 roles")
    }

    console.log("make updates to firebase ", { checked, name, CRUD })
    CRUD.update('ghost-contracts', userId, { committeeRoleId: [...existingRoles, roleId] })
}

/**
 * This form doesn't have a submit button... It is a series of checkboxes that should be saved on change
 * 
 * This form requires getting all artists info
 */
function setUpVolunteerResponsibilityForm(contracts) {

    console.log("setUpVolunteerResponsibilityForm", { contracts })

    const filledRoles = Object.values(contracts).map(contract => contract.committeeRoleId).flat()

    // Set timeout is a work around b/c the form is not loaded when the document is ready
    setTimeout(() => {
        const form = document.querySelector('div#committee-positions')
        const roles = form.querySelectorAll('li.role')
        roles.forEach(role => {
            // find all the roles
            // Add html to each role 
            const input = createCheckbox(role)
            role.insertAdjacentElement("afterbegin", input)
            input.addEventListener('change', handleCheckboxChange)
        })
    }, 0)

    function createCheckbox(role) {
        const isRoleFilled = filledRoles.includes(role.getAttribute('data-role-id'))

        const roleId = role.getAttribute('data-role-id')
        const thisRole = roles[roleId]
        const label = document.createElement('label')
        label.classList.add('role-checkbox')
        // span for username
        const userNameSpan = document.createElement('span')
        userNameSpan.classList.add('user-name')
        label.appendChild(userNameSpan)
        const checkbox = document.createElement('input')
        label.appendChild(checkbox)
        checkbox.type = 'checkbox'
        checkbox.name = thisRole.title
        checkbox.value = roleId
        checkbox.checked = isRoleFilled ? true : false
        checkbox.disabled = isRoleFilled ? true : false
        return label
    }
}

function updateVolunteerResponsibilityForm(contracts) {
    setTimeout(() => {

        const filledRoles = Object.values(contracts).map(contract => contract.committeeRoleId).flat()
        const form = document.querySelector('div#committee-positions')
        const roles = form.querySelectorAll('li.role')
        roles.forEach(role => {
            const roleId = role.getAttribute('data-role-id')
            const thisRole = roles[roleId]
            const checkbox = role.querySelector('input[type="checkbox"]')
            const isRoleFilled = filledRoles.includes(roleId)
            checkbox.checked = isRoleFilled ? true : false
            checkbox.disabled = isRoleFilled ? true : false

            // mark the role icon with the user's name
            const label = role.querySelector('label')
            if (isRoleFilled) {
                const userId = contracts.find(contract => contract.committeeRoleId.includes(roleId))?.userId
                label.querySelector('.user-name').innerText = userId || "[UNKNOWN]"
            } else {
                label.querySelector('.user-name').innerText = ''
            }

        })
    }, 0)
}

function setUpStudioSharingForm(contracts) {
    console.log("setUpStudioSharingForm", { contracts })
    const contract = contracts.find(contract => contract.userId === firebase.auth.currentUser.uid)
    if (contract) {
        console.log("Setting up studio sharing form", {contract})
        const form = document.querySelector('form#studio-sharing-form')
        const studioSharingInfo = contract.StudioSharingInfo

        // set the inputs
        Object.values(studioSharingInfo).forEach(value => {
            const input = form.querySelector(`input[id="${value}"]`)
            if (input) {
                // if input it radio or checkbox 
                if (input.type === 'radio' || input.type === 'checkbox') {
                    input.checked = true;
                    // trigger change event
                    const event = new Event('change')
                    input.dispatchEvent(event)
                } else {
                    input.value = value
                }

            }
        })
    }
}



function setDigitalImagesForm(contracts){
    console.log("setDigitalImagesForm", { contracts })
    const contract = contracts.find(contract => contract.userId === firebase.auth.currentUser.uid)
    if (contract) {
        console.log("Setting up digital images form", {contract})
        const form = document.querySelector('form#digital-images-form')
        const digitalImage = contract['digitalImage1']
        if (digitalImage) {
            console.log("Setting digital image", { digitalImage })
            const component = form.querySelector('file-input-component[fieldname="digitalImage1"]')
            
            // get image name
            const ref = firebase.storage.ref(firebase.storage.getStorage(), digitalImage);
            const name = ref.name;


            component.setImage(digitalImage, { name })
        }
    }
}
