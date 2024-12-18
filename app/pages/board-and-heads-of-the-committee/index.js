import roles from '../my-contract/committee-roles.js'

document.addEventListener('DOMContentLoaded', async () => { 

    await CRUD.readAll('ghost-contracts').then(contracts => {
        setVolunteerResponsibilityForm(contracts);
    })
    
    CRUD.listen('ghost-contracts', null, (existingContracts) => {
        let contracts = existingContracts;
        updateVolunteerResponsibilityForm(contracts);
    })
 })



 function updateVolunteerResponsibilityForm(contracts) {
    setTimeout(() => {

        const filledRoles = Object.values(contracts).map(contract => contract.committeeRoleId).flat()
        const form = document.querySelector('div#committee-positions')
        const roles = form.querySelectorAll('li.role')
        roles.forEach(role => {
            const roleId = role.getAttribute('data-role-id')
            const isRoleFilled = filledRoles.includes(roleId)

            // mark the role icon with the user's name
            const userNameSpan = role.querySelector('.user-name')
            if (isRoleFilled) {

                // Set the user name next to the checkbox
                const committeeMemberContract = contracts.find(contract => contract.committeeRoleId && contract.committeeRoleId.includes(roleId))
                  const fullName = committeeMemberContract && committeeMemberContract.artistDetails && committeeMemberContract.artistDetails.firstName + ' ' + committeeMemberContract.artistDetails.lastName
            userNameSpan.innerText = fullName  || "[UNKNOWN]"


                // Get this users contract
                const contract = contracts.find(contract => contract.userId === firebase.auth.currentUser.uid)
                if(!contract) return;
                const userId = contract?.userId
                // get my roles fresh from the DB
                // get my role set
                // myRoles and filledRoles are an array of ids (ints)
                const myRoles = contract.committeeRoleId || []


                // logIf.client && console.log("Updating offload buttons", { myRoles, roleId, "myRoles.includes(roleId)": myRoles.includes(roleId), contract })

            } else {
                userNameSpan.innerText = '[ OPEN POSITION ]'
            }

        })
    }, 0)
}

function setVolunteerResponsibilityForm(contracts) {

    const filledRoles = Object.values(contracts).map(contract => contract.committeeRoleId).flat()
    // logIf.client && console.log("setUpVolunteerResponsibilityForm", { contracts, filledRoles })


    // Set timeout is a work around b/c the form is not loaded when the document is ready
    setTimeout(() => {
        const myContract = contracts.find(contract => contract.userId === firebase.auth.currentUser.uid) || []
        const form = document.querySelector('div#committee-positions')
        const roles = form.querySelectorAll('li.role')
        const myRoles = myContract.committeeRoleId || []
        roles.forEach(role => {
            // find all the roles
            // Add html to each role 
            const responsibility = createResponsibility(role)
            const tasks = createRoleTasks(role)
            const userName = createUserName(role)
            role.insertAdjacentElement("afterbegin", userName)
            role.querySelector('.responsibility').appendChild(responsibility)
            if(tasks) responsibility.insertAdjacentElement("beforeend", tasks)

            // get my role set
            // myRoles and filledRoles are an array of ids (ints)

            // check if this role belongs to me
            const roleId = role.getAttribute('data-role-id')
            const hasMyRoles = myRoles.includes(roleId)

      


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


    function createResponsibility(role) {
        const roleId = role.getAttribute('data-role-id')
        const thisRole = roles[roleId]
        const responsibility = document.createElement('div')
        // responsibility.classList.add('responsibility')
        responsibility.innerText = thisRole.responsibility
        return responsibility
    }


    function createUserName(role) {

        // span for username
        const userNameSpan = document.createElement('span')
        userNameSpan.classList.add('user-name')

        // get the user id
        const roleId = role.getAttribute('data-role-id')
        // get the user name
        const committeeMemberContract = contracts.find(contract => contract.committeeRoleId && contract.committeeRoleId.includes(roleId))

        if(committeeMemberContract){   
            const fullName = committeeMemberContract && committeeMemberContract.artistDetails && committeeMemberContract.artistDetails.firstName + ' ' + committeeMemberContract.artistDetails.lastName
            userNameSpan.innerText = fullName  || "[UNKNOWN]"
        } else {
            userNameSpan.innerText = "[ OPEN POSITION ]"
        }


        return userNameSpan
    }




}


