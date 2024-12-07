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
function handleDigitalImagesForm(e) {
    e.preventDefault();

    const { values, form } = getFormValues('form#digital-images-form')
    console.log({ values, form })
    setLoading(form, false)

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

    setLoading(form, false)

    // const {values, form} = getFormValues('form#studio-sharing-form')
    // console.log({values, form})


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

