
import '../../../utils/logIf.js'; // This is a special way to import the module, it will work in both Node.js and the browser. 


let contracts;
const imageFields = ['digitalImage1', 'digitalImage2', 'digitalImage3', 'artistInStudioImage', 'brochureImage']
let roles;

document.addEventListener('DOMContentLoaded', async function () {

    roles = await CRUD.readAll('committee-roles')
    logIf.client && console.log("My Contract Page Loaded")

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

    // Add the Committee html
    await fetch('/my-contract/committee-positions.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('#committee-positions-container').innerHTML = data;
        })

    CRUD.readAll('ghost-contracts').then((existingContracts) => {
        contracts = existingContracts

        // Set up Signature
        setSignatureForm(contracts);

        // set up artist details form
        setArtistDetailsForm(contracts);

        // Set up volunteer responsibility form (Adds checkboxes to the form)
        setUpVolunteerResponsibilityForm(contracts);

        // set the Studio Sharing form
        setUpStudioSharingForm(contracts);

        // Set the digital images form
        setDigitalImagesForm(contracts);

        // Set Artistic demonstration
        setArtisticDemonstrationForm(contracts);

        // set Paypal 
        setPaypalButton(contracts);
    })

    // Set the users assigned roles 
    // listen to other peoples roles
    CRUD.listen('ghost-contracts', null, (existingContracts) => {
        contracts = existingContracts;
        updateVolunteerResponsibilityForm(contracts);
    })
})




function handleSignatureForm(e) {
    e.preventDefault();
    const { values, form } = getFormValues('form#my-signature-form')

    CRUD.update('ghost-contracts', firebase.auth.currentUser.uid, { ...values }).then(() => {
        setLoading(form, false)
    })

}


function handleArtistDetailsForm(e) {
    e.preventDefault();
    const { values, form } = getFormValues('form#artist-details-form')
    // Get form
    CRUD.update('ghost-contracts', firebase.auth.currentUser.uid, {
        artistDetails: {
            ...values
        }
    }).then(() => {
        setLoading(form, false)
    })

}
async function handleDigitalImagesForm(e) {
    e.preventDefault();

    const { values, form } = getFormValues('form#digital-images-form')
    logIf.client && console.log({ values, form })

    // save images to storage
    // Get file url and save it to firebase by image element id.
    // Save to firestore
    imageFields.forEach(async (field) => {
        
        try {
            const url = await CRUD.saveImage(values[field])
            CRUD.update('ghost-contracts', firebase.auth.currentUser.uid, {
                images: {
                    [field]: url
                }
            }).then(() => {
                setLoading(form, false)
            })
        } catch (error) {
            console.log("Error saving image", { error, field })
        }

    })


}
// This form is unique. It should return a single string which compiles a sentence based on the form values 
/*
"I have my own studio space within the GHOST tour boundaries.... 
I do not have room for additional artists. 
I am willing to show my art at another artist's studio space, even though I have my own studio. 
I don’t have my own art canopy so would need a covered space (ie, a garage or indoors) to set up"
*/
async function handleStudioSharingForm(e) {
    e.preventDefault();
    const form = document.querySelector('form#studio-sharing-form')

    // get user ID
    let contract;

    await new Promise((resolve, reject) => {
        firebase.auth.onAuthStateChanged(async (user) => {
            contract = await CRUD.read('ghost-contracts', user.uid)
            resolve()
        })
    })


    const StudioSharingPayload = {
        StudioSharingAnswer: "",
        StudioSharingInfo: contract && contract.StudioSharingInfo || {
            studioPreference: "",
            studioAvailability: "",
            artistsAccommodated: "",
            studioSharingPlans: "",
            willingnessToRelocate: "",
            canopyPreference: "",
            "canopy-studio": "",
            "canopy-no-studio": "",
            studioSigns: "",
            'studioSigns-2': "",
        }
    }

    console.log("StudioSharingPayload", StudioSharingPayload)

    // Get first string (aka "studioPreference")
    const studioPreference = form.querySelector('input[name="studioPreference"]:checked')
    if (!studioPreference) return formAlert("Please select an option. Do you have a studio space or not?");
    StudioSharingPayload.StudioSharingAnswer = studioPreference.parentNode.innerText;
    StudioSharingPayload.StudioSharingInfo.studioPreference = studioPreference.value;

    const IHaveAStudio = StudioSharingPayload.StudioSharingAnswer.includes('I have my own studio space')
    // Get second string based on studioPreference 
    if (IHaveAStudio) {
        const studioAvailability = form.querySelector('input[name="studioAvailability"]:checked')
        if (!studioAvailability) return formAlert("Please select an option. Can you share your studio space?");
        let studioAvailabilityAnswer = studioAvailability.parentNode.innerText;

        // append answer to string result
        StudioSharingPayload.StudioSharingAnswer += ' \n\t' + studioAvailabilityAnswer;
        StudioSharingPayload.StudioSharingInfo.studioAvailability = studioAvailability.value;

        // Check for willingness to relocate
        if (studioAvailabilityAnswer.includes("I have my own studio but am willing to show my art at another artist's studio space")) {
            // find canopy preference 
            const canopyPreference = form.querySelector('input[name="canopy-studio"]:checked')
            if (!canopyPreference) return formAlert("Please select an option. Do you have a canopy?");
            if (canopyPreference) {
                // StudioSharingAnswer += ' \n\t\t' + canopyPreference.parentNode.innerText;
                StudioSharingPayload.StudioSharingAnswer += ' \n\t\t' + canopyPreference.parentNode.innerText;
                StudioSharingPayload.StudioSharingInfo['canopy-studio'] = canopyPreference.value;
            }
        }

        // Check for no room at studio
        if (studioAvailabilityAnswer.includes("I want to stay at my own studio but do not have room for additional artists")) {
            const studioSigns2 = form.querySelector('input[name="studioSigns-2"]')
            if (!studioSigns2.value) return formAlert("Please provide information on how many signs you have");
            StudioSharingPayload.StudioSharingAnswer += ' \n\t\t' + "I would like " + studioSigns2.value.trim() + " signs";
            StudioSharingPayload.StudioSharingInfo['studioSigns-2'] = studioSigns2.value;
        }




        // Check for type of answer  "I can share my studio space"
        const ICanShareMySpace = studioAvailabilityAnswer.includes('I can share my studio space')
        if (ICanShareMySpace) {
            // get how many artists can be accommodated
            const artistsAccommodated = form.querySelector('input[name="artistsAccommodated"]')
            if (!artistsAccommodated.value) return formAlert("Please provide information on how many artists can be accommodated");
            StudioSharingPayload.StudioSharingAnswer += ' \n\t\t' + artistsAccommodated.value.trim() + " artists can be accommodated";
            StudioSharingPayload.StudioSharingInfo.artistsAccommodated = artistsAccommodated.value;



            // Studio description
            const studioDescription = form.querySelector('textarea[name="studioDescription"]')
            if (!studioDescription.value) return formAlert("Please provide information about your studio space");
            StudioSharingPayload.StudioSharingAnswer += ' \n\t\t' + "Here is a description of my place: " + studioDescription.value.trim();
            StudioSharingPayload.StudioSharingInfo.studioDescription = studioDescription.value;

            // get plans to share studio space
            const studioSharingPlans = form.querySelector('textarea[name="studioSharingPlans"]')
            if (!studioSharingPlans.value) return formAlert("Please provide information on how you plan to share your studio space");
            // StudioSharingAnswer += ' \n\t\t' + studioSharingPlans.value.trim();
            StudioSharingPayload.StudioSharingAnswer += ' \n\t\t' + "I am planning to share my space with " + studioSharingPlans.value.trim();
            StudioSharingPayload.StudioSharingInfo.studioSharingPlans = studioSharingPlans.value;

            // Studio number of signs
            const studioSigns = form.querySelector('input[name="studioSigns"]')
            if (!studioSigns.value) return formAlert("Please provide information on how many signs you have");
            StudioSharingPayload.StudioSharingAnswer += ' \n\t\t' + "I would like " + studioSigns.value.trim() + " signs";
            StudioSharingPayload.StudioSharingInfo.studioSigns = studioSigns.value;
        }





    } else { // option 2 selected "I don't have a studio"
        // Get canopy info
        const canopyPreference = form.querySelector('input[name="canopy-no-studio"]:checked')
        if (!canopyPreference) return formAlert("Please select an option. Do you have a canopy?");
        // StudioSharingAnswer += ' \n\t' + canopyPreference.parentNode.innerText;
        StudioSharingPayload.StudioSharingAnswer += ' \n\t' + canopyPreference.parentNode.innerText;
        StudioSharingPayload.StudioSharingInfo['canopy-no-studio'] = canopyPreference.value

    }

    logIf.client && console.log({ StudioSharingPayload })





    // const {values} = getFormValues('form#studio-sharing-form')
    // logIf.client && console.log({values, form})

    // Save to firestore
    setLoading(form, true)
    CRUD.update('ghost-contracts', firebase.auth.currentUser.uid, StudioSharingPayload).then(() => {
        setLoading(form, false)
    })

    function formAlert(message) {
        logIf.client && console.log("Form Alert", message)
        alert(message)
    }

}


function handleVolunteerResponsibilityForm(e) {
    e.preventDefault();

    const { values, form } = getFormValues('form#volunteer-responsibility-form')
    logIf.client && console.log({ values, form })
    setLoading(form, false)
}

function handleArtisticDemonstrationForm(e) {
    e.preventDefault();

    const { values, form } = getFormValues('form#artistic-demonstration-form');

    logIf.client && console.log({ values, form })
    CRUD.update('ghost-contracts', firebase.auth.currentUser.uid, { ...values }).then(() => {
        setLoading(form, false)
    })


}


function handleCheckboxChange(e) {
    const { checked, name, value: roleId } = e.target
    const userId = firebase.auth.currentUser.uid
    const existingRoles = contracts.find(contract => contract.userId === userId)?.committeeRoleId || []

    // Set limit to 2 roles
    if (checked && existingRoles.length >= 3) {
        e.target.checked = false
        return alert("You can only select 3 roles")
    }

    logIf.client && console.log("make updates to firebase ", { checked, name, CRUD })
    CRUD.update('ghost-contracts', userId, { committeeRoleId: [...existingRoles, roleId] })
}

/**
 * This form doesn't have a submit button... It is a series of checkboxes that should be saved on change
 * 
 * This form requires getting all artists info
 */
function setUpVolunteerResponsibilityForm(contracts) {

    const filledRoles = Object.values(contracts).map(contract => contract.committeeRoleId).flat()
    logIf.client && console.log("setUpVolunteerResponsibilityForm", { contracts, filledRoles })


    // Set timeout is a work around b/c the form is not loaded when the document is ready
    setTimeout(() => {
        const myContract = contracts.find(contract => contract.userId === firebase.auth.currentUser.uid) || []
        const form = document.querySelector('div#committee-positions')
        const roles = form.querySelectorAll('li.role')
        const myRoles = myContract.committeeRoleId || []
        roles.forEach(role => {
            // find all the roles
            // Add html to each role 
            const input = createCheckbox(role)
            const responsibility = createResponsibility(role)
            const tasks = createRoleTasks(role)
            const button = createOffloadButton(role)
            const infoIcon = createInfoIcon(role)
            role.querySelector('.responsibility').appendChild(responsibility)
            role.insertAdjacentElement("afterbegin", input)
            if (tasks) responsibility.insertAdjacentElement("beforeend", tasks)
            input.addEventListener('change', handleCheckboxChange)

            // get my role set
            // myRoles and filledRoles are an array of ids (ints)

            // check if this role belongs to me
            const roleId = role.getAttribute('data-role-id')
            const hasMyRoles = myRoles.includes(roleId)

            // logIf.client && console.log("Bugfix, multiple offload button ",{ roleId, myRoles, hasMyRoles, role, button })

            // check if this role is filled
            if (hasMyRoles) {
                role.insertAdjacentElement("beforeend", button)
                button.addEventListener('click', handleOffload)
            }



            // // If this role belongs to me, add an offload button
            // if(hasMyRoles){   
            //     role.insertAdjacentElement("beforeend", button)
            //     button.addEventListener('click', handleOffload)
            // } else {
            //     button.remove()
            // }
        })
    }, 0)

    function createRoleTasks(role) {
        const roleId = role.getAttribute('data-role-id')
        const thisRole = roles[roleId]
        const tasks = document.createElement('ul')
        tasks.classList.add('tasks')
        thisRole.tasks.forEach(task => {
            const li = document.createElement('li')
            li.innerText = task
            tasks.appendChild(li)
        })
        return tasks
    }

    function createInfoIcon(role) {
        const icon = document.createElement('i')
        icon.classList.add('fas', 'fa-info-circle', 'info-icon')
        icon.setAttribute('data-bs-toggle', 'tooltip')
        icon.setAttribute('data-bs-placement', 'top')
        icon.setAttribute('title', roles[role.getAttribute('data-role-id')].responsibility)
        return icon
    }

    function createResponsibility(role) {
        const roleId = role.getAttribute('data-role-id')
        const thisRole = roles[roleId]
        const responsibility = document.createElement('div')
        // responsibility.classList.add('responsibility')
        responsibility.innerText = thisRole.responsibility
        return responsibility
    }

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

function handleOffload(e) {
    logIf.client && console.log("Offloading", e.target.parentNode.getAttribute('data-role-id'))
    const roleId = e.target.parentNode.getAttribute('data-role-id');
    const userId = firebase.auth.currentUser.uid;
    let committeeRoleIds = contracts.find(contract => contract.userId === userId)?.committeeRoleId || [];
    committeeRoleIds = committeeRoleIds.filter(id => id !== roleId);

    e.target.remove()

    CRUD.update('ghost-contracts', userId, { committeeRoleId: committeeRoleIds }).then(() => {
        contracts = contracts.map(contract =>
            contract.userId === userId ? { ...contract, committeeRoleId: committeeRoleIds } : contract
        );
        updateVolunteerResponsibilityForm(contracts);
    });
}
function createOffloadButton(role) {
    const button = document.createElement('button')
    button.innerText = "Offload"
    button.setAttribute("type", "button")
    button.classList.add('offload-button')
    return button
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

                // Set the user name next to the checkbox
                const committeeMemberContract = contracts.find(contract => contract.committeeRoleId && contract.committeeRoleId.includes(roleId))
                const fullName = committeeMemberContract && committeeMemberContract.artistDetails && committeeMemberContract.artistDetails.firstName + ' ' + committeeMemberContract.artistDetails.lastName
                label.querySelector('.user-name').innerText = fullName || "[UNKNOWN]"


                // Get this users contract
                const contract = contracts.find(contract => contract.userId === firebase.auth.currentUser.uid)
                if (!contract) return;
                const userId = contract?.userId
                // get my roles fresh from the DB
                // get my role set
                // myRoles and filledRoles are an array of ids (ints)
                const myRoles = contract.committeeRoleId || []


                logIf.client && console.log("Updating offload buttons", { myRoles, roleId, "myRoles.includes(roleId)": myRoles.includes(roleId), contract })



                if (myRoles.includes(roleId)) {
                    const button = createOffloadButton(role)
                    // check role for existing button
                    const existingButton = role.querySelector('.offload-button')
                    logIf.client && console.log("existingButton", existingButton)
                    if (!existingButton) {



                        role.insertAdjacentElement("beforeend", button)
                        button.addEventListener('click', handleOffload)
                    }
                }



            } else {
                label.querySelector('.user-name').innerText = ''
            }

        })
    }, 0)
}

function setUpStudioSharingForm(contracts) {
    logIf.client && console.log("setUpStudioSharingForm", { contracts })
    const contract = contracts.find(contract => contract.userId === firebase.auth.currentUser.uid)
    if (contract) {
        logIf.client && console.log("Setting up studio sharing form", { contract })
        const form = document.querySelector('form#studio-sharing-form')
        const studioSharingInfo = contract.StudioSharingInfo
        if (!studioSharingInfo) return;

        // set the inputs
        Object.entries(studioSharingInfo).forEach(([key, value]) => {
            const input = form.querySelector(`input[name="${key}"][value="${value}"]`)
            const artistsAccommodated = form.querySelector(`input[name="artistsAccommodated"`)
            const studioSigns = form.querySelector(`input[name="studioSigns"`)
            const studioSigns2 = form.querySelector(`input[name="studioSigns-2"`)
            const willingnessToRelocate = form.querySelector(`input[name="willingnessToRelocate"`)
            const textarea = form.querySelector(`textarea[name="${key}"]`)
            if (input) {
                if (input.type === 'text') {
                    input.value = value
                } else if (input.type === 'number') {
                    console.log("Setting number", { value })
                    input.value = Number(value)
                }
                input.checked = true
                // trigger change event
                const event = new Event('change')
                input.dispatchEvent(event)

            } else {

            }
            if (textarea) {
                textarea.value = value
                const event = new Event('change')
                textarea.dispatchEvent(event)

            }
            if (artistsAccommodated && key === 'artistsAccommodated') {
                artistsAccommodated.value = Number(value)
                const event = new Event('change')
                artistsAccommodated.dispatchEvent(event)
            }
            if (studioSigns && key === 'studioSigns') {
                studioSigns.value = Number(value)
                const event = new Event('change')
                studioSigns.dispatchEvent(event)
            }
            if (studioSigns2 && key === 'studioSigns-2') {
                studioSigns2.value = Number(value)
                const event = new Event('change')
                studioSigns2.dispatchEvent(event)
            }
            if (willingnessToRelocate && key === 'willingnessToRelocate') {
                willingnessToRelocate.checked = true
                const event = new Event('change')
                willingnessToRelocate.dispatchEvent(event)
            }
        })

    }
}



function setDigitalImagesForm(contracts) {
    logIf.client || true && console.log("setDigitalImagesForm", { contracts })
    const contract = contracts.find(contract => contract.userId === firebase.auth.currentUser.uid)
    const digitalImageCommitteeMember = contracts.find(contract => contract.committeeRoleId && contract.committeeRoleId.includes('12'))

    if (digitalImageCommitteeMember) {
        document.querySelector('#digitalImageCommitteeMember').appendChild(document.createTextNode("(" + digitalImageCommitteeMember.artistDetails.firstName + ' ' + digitalImageCommitteeMember.artistDetails.lastName + " - " + (digitalImageCommitteeMember.artistDetails.personalEmail || "") + ")"))
    }

    if (contract) {


        imageFields.forEach(field => {


            logIf.client && console.log("Setting up digital images form", { contract, field })
            const form = document.querySelector('form#digital-images-form')
            if (!contract.images) return;
            const digitalImage = contract.images[field]
            if (digitalImage) {
                logIf.client && console.log("Setting digital image", { digitalImage })
                const component = form.querySelector(`file-input-component[fieldname="${field}"]`)

                // get image name
                const ref = firebase.storage.ref(firebase.storage.getStorage(), digitalImage);
                const name = ref.name;

                const thisComponent = component.setImage(digitalImage, { name })

                // Set not required for input (to allow form to be submitted when user has existing image) --- you cannot set the value for file inputs 
                thisComponent.querySelector('input[type=file]').removeAttribute('required')

                logIf.client && console.log({ thisComponent })
            }
        })

    }
}


function setArtisticDemonstrationForm(contracts) {
    const contract = contracts.find(contract => contract.userId === firebase.auth.currentUser.uid)
    if (contract) {
        logIf.client && console.log("Setting up artistic demonstration form", { contract })
        const form = document.querySelector('form#artistic-demonstration-form')
        const artisticDemonstration = contract.artisticDemonstration
        if (artisticDemonstration) {
            logIf.client && console.log("Setting artistic demonstration", { artisticDemonstration })
            const textarea = form.querySelector(`textarea[name="artisticDemonstration"]`)
            textarea.value = artisticDemonstration
            // trigger change
            const event = new Event('change')
            textarea.dispatchEvent(event)
        }
        const artistMentor = contract.artistMentor
        if (artistMentor) {
            logIf.client && console.log("Setting artistic mentor", { artistMentor })
            const checkbox = form.querySelector(`input[name="artistMentor"]`)
            checkbox.checked = true
            // trigger change
            const event = new Event('change')
            checkbox.dispatchEvent(event)
        }
    }
}

function setSignatureForm(contracts) {
    const contract = contracts.find(contract => contract.userId === firebase.auth.currentUser.uid)
    if (contract) {
        logIf.client && console.log("Setting up signature form", { contract })
        const form = document.querySelector('form#my-signature-form')
        const signature = contract.signature
        if (signature) {
            logIf.client && console.log("Setting signature", { signature })
            const input = form.querySelector(`input[name="signature"]`)
            input.value = signature
            // trigger change
            const event = new Event('change')
            input.dispatchEvent(event)
        }
    }
}

function setArtistDetailsForm(contracts) {
    const form = document.querySelector('form#artist-details-form')
    const contract = contracts.find(contract => contract.userId === firebase.auth.currentUser.uid)
    if (!contract) return
    const artistDetails = contract.artistDetails
    logIf.client && console.log("Setting up artist details form", { artistDetails, contract })
    if (artistDetails) {
        logIf.client && console.log("Setting artist details", { artistDetails })
        const inputs = form.querySelectorAll('input, textarea')
        inputs.forEach(input => {
            const name = input.name
            input.value = artistDetails[name] || ""
            // trigger change
            const event = new Event('change')
            input.dispatchEvent(event)
        })
    }
}




/* TODO: Only allow payment if the rest of the contract has been filled */

async function setPaypalButton(contracts) {
    logIf.client && console.log("setPaypalButton", { contracts })
    const contract = contracts.find(contract => contract.userId === firebase.auth.currentUser.uid)
    if (!contract) {
        document.querySelector('.scholarship-btn-container').style.display = 'block';
        return
    };

    const membershipPaid = contract && contract.artistDetails && contract.artistDetails.membershipPaid || false

    // get scholarship status from scholarship data collection
    await CRUD.read('scholarship-applications', firebase.auth.currentUser.uid).then(scholarship => {

        // logIf.client && console.log("scholarship", {scholarship})
        true && console.log("scholarship", { scholarship })
        // use sandbox logic here.
        const scholarshipGranted = scholarship.scholarshipGranted
        const bypass = scholarship.bypass
        window.initializePaypalButtons(scholarshipGranted ? (bypass ? bypass : 125) : 225)
        // window.initializePaypalButtons(1)

        if (scholarshipGranted) {
            document.querySelector('.standard-fee').style['text-decoration'] = 'line-through'
            document.querySelector('.scholarship-fee').style['text-decoration'] = 'none'
            document.querySelector('.scholarship-fee').style.display = 'inline-block'
        }
        if (scholarship.name && !scholarship.hasBeenReviewed) {
            document.querySelector('.scholarship-pending').style.display = 'inline-block'
        }

        if (scholarship.name) { // If an application has been submitted
            document.querySelector('.scholarship-btn-container').style.display = 'none'
        } else {
            document.querySelector('.scholarship-btn-container').style.display = 'block'
        }

    })

    if (membershipPaid) {
        document.querySelector('.membership-paid').style.display = 'inline-block'
        document.querySelector('.membership-payment-due').style.display = 'none'

        // show recept 
        const membershipReceipt = contract.artistDetails.membershipReceipt
        if (membershipReceipt) {
            const paidOn = new Date(membershipReceipt.createdAt.seconds * 1000).toLocaleString();
            document.querySelector('.membership-receipt').innerText =
                `Transaction ID: ${membershipReceipt.transactionId} \nAmount: ${membershipReceipt.amount} \nStatus: ${membershipReceipt.status}` +
                `\nPaid on: ${paidOn}`;
        }
    }
}



/// 