import roles from '../my-contract/committee-roles.js'

document.addEventListener('DOMContentLoaded', async () => { 


    
    CRUD.listen('ghost-contracts', null, (existingContracts) => {
        let contracts = existingContracts;
        updateVolunteerResponsibilityForm(contracts);
    })
 })


function updateVolunteerResponsibilityForm(contracts) {

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




}


