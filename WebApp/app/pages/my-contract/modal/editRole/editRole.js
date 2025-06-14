function editRole() {


    const htmlCommitteePositions = document.querySelector('#committee-positions')
    const roleElems = Array.from(htmlCommitteePositions.querySelectorAll('.role'))



    // edit role
    roleElems.forEach(role => {
        // For every "committee",  have an edit button
        const editButton = document.createElement('button')
        editButton.setAttribute('type', 'button')
        editButton.classList.add('small', 'edit-role-btn', 'editor-control')
        editButton.setAttribute('title', "Edit Role")
        role.querySelector('.responsibility').insertAdjacentElement('afterend', editButton)

        const icon = document.createElement('i')
        icon.classList.add('fa', 'fa-user-edit', 'icon-white')
        editButton.appendChild(icon)

    })


    // Fetch my-contract/modal/createCommittee.html


    Promise.all([

        fetch('modal/editRole/editRole.html').then(response => response.text()).then(html => {
            console.log("Fetched editRole.html", { html })

            // process html as template string with some context
            const context = {
                title: "[Content should be added when modal is opened]",
                committee: "[Content should be added when modal is opened]",
                responsibility: "[Content should be added when modal is opened]",
            }
            const processedHTML = html
                .replace(/{{title}}/g, `${context.title}`)
                .replace(/{{committee}}/g, `${context.committee}`)
                .replace(/{{responsibility}}/g, `${context.responsibility}`);

            document.body.insertAdjacentHTML('beforeend', processedHTML)
            moveLabel(document.getElementById('editRoleModal'))


            // set up delete warning popup
            $(function () {
                $('[data-toggle="confirmation"]').confirmation()
            })
        })
    ]).then(() => {
        setSelect2FieldOptionsForRoleEditors()

        setListenerToSaveRoleEdit()

        setListenerToDeleteRole()
    })







    Array.from(document.querySelectorAll('.edit-role-btn')).forEach(btn => {
        // ON OPEN EDIT ROLE MODAL
        btn.addEventListener('click', openEditRoleModal)
    })



}


window.setSelect2FieldOptionsForRoleEditors = function () {


    // Set the committee-select2 
    const committeeSelect = document.querySelectorAll('select.committee-select2')

    committeeSelect.forEach(select => {


        let committeeOptions = []
        Object.values(ghostCommittees).forEach(committee => {
            console.log({ committee })
            committeeOptions.push(committee)
        })
        committeeOptions = Array.from(committeeOptions).sort().filter(c => c != "No Committee")
        console.log("Setting up committee select2", { committeeOptions })
        console.log({ committeeSelect })
        $(select).select2({
            placeholder:"",
            data: committeeOptions.map(c => {
                return { text: c.committee, id: c.id }
            })
        });

    })


    // set up role-assignment select2
    const roleAssignmentSelect = document.querySelectorAll('select.role-assignment-select2')
    roleAssignmentSelect.forEach(select => {
       
        $(roleAssignmentSelect).select2({
            data: contracts.filter(c => c.artistDetails).sort(byLastName).map(contract => {
                return {id: contract.userId, text: `${contract.artistDetails.firstName} ${contract.artistDetails.lastName}` }
            })
        })
    })




    // Set the sidebar button options
    const sidebarButtonsEl = document.querySelectorAll('select.sideBarButtons-select2')
    sidebarButtonsEl.forEach(select => {


        const sideBarButtons = Object.values(roles).reduce((acc, role) => {
            if (!role.sideBarButtons) return acc
            role.sideBarButtons.forEach(button => acc.add(button))
            return acc
        }, new Set())
        console.log({ sideBarButtons, roles, rolesButtons: Object.values(roles).map(role => role.sidebarButtons) })
        $(select).select2({
            multiple: true,
            data: Object.entries(sideBarButtonNameMap).map(([codeName, name]) => {
                return { id: codeName, text: name }
            }).filter(Boolean).sort()
        })

    })


   

    // Set the role tasks select2
    // No options need to be set here at this moment, but 
    // we need to set multiple and tags to true
    const roleTasksSelect = document.querySelectorAll('select.tasks-select2')
    roleTasksSelect.forEach(select => {
        $(select).select2({
            multiple: true,
            tags: true
        })
    })


    // Set the role privileges select2
    // Get all possible privileges from the roles
    const privileges = Object.values(roles).reduce((acc, role) => {
        if (!role.privileges) return acc
        role.privileges.forEach(privilege => acc.add(privilege))
        return acc
    }, new Set())
    console.log({ privileges })
    const privilegesSelect = document.querySelectorAll('select.privileges-select2')
    privilegesSelect.forEach(select => {

        $(select).select2({
            multiple: true,
            data: Array.from(privileges).sort()
        })
    })


}

function setListenerToSaveRoleEdit() {
    document.querySelector('#editRoleModal button#editRole').addEventListener('click', () => {
        console.log("Save Role Edit clicked")

        // Save assignment, title, committee, responsibility, tasks, privileges, sideBarButtons
    
        // get the values
        const title = document.querySelector('#editRoleModal input#title').value
        const responsibility = document.querySelector('#editRoleModal textarea#responsibility').value
        const committee = document.querySelector('#editRoleModal select.committee-select2').value
        const roleAssignment = document.querySelector('#editRoleModal select.role-assignment-select2').value
        const tasks = Array.from(document.querySelector('#editRoleModal select.tasks-select2').selectedOptions).map(option => option.value)
        const privileges = Array.from(document.querySelector('#editRoleModal select.privileges-select2').selectedOptions).map(option => option.value)
        const sideBarButtons = Array.from(document.querySelector('#editRoleModal select.sideBarButtons-select2').selectedOptions).map(option => option.value)
    
        // get the role id
        const roleId = document.querySelector('#editRoleModal').getAttribute('data-editing-role-id')

        // update the role in the database
        const roleData = {
            title,
            responsibility,
            committee,
            tasks,
            privileges,
            sideBarButtons,
        }
    


        console.log("editing a role",{ roleData, roleId, "role assigned to: ": roleAssignment })

        CRUD.update('committee-roles', roleId, roleData).then(async () => {
            console.log("Role updated in db")
            // update UI
            const roleEl = document.querySelector(`.role[data-role-id="${roleId}"]`)
            roleEl.querySelector('.role-title').innerText = title
            roleEl.querySelector('.responsibility-description').innerText = responsibility
        
            roleEl.querySelector('.tasks').innerHTML = tasks.map(task => `<li>${task}</li>`).join('')

           roleAssignment && await CRUD.read('ghost-contracts', roleAssignment).then(memberData => {
                roleEl.querySelector('.user-name').innerText = `${memberData.artistDetails.firstName} ${memberData.artistDetails.lastName}`
                roleEl.querySelector('.user-name').setAttribute('data-user-id', roleAssignment)
            })
            // close the modal
            document.querySelector('#editRoleModal').classList.remove('show')
        })
    })
}


window.openEditRoleModal = function(e) {

    const roleEl = e.target.closest('.role')

    // set the title and responsibility (if they exist)
    const title = roleEl.querySelector('.role-title')?.innerText || " "
    const responsibility = roleEl.querySelector('.responsibility-description')?.innerText
    // update the committee select2
    const committee = roleEl.closest('.committee').getAttribute('data-committee-id')
    const roleAssignment = roleEl.querySelector('.user-name')?.getAttribute('data-user-id')
    // Get the role id and role info
    const roleId = roleEl.getAttribute('data-role-id')
    console.log("Edit Role", { roleEl, title, responsibility, roleId, committee, roleAssignment })
    const thisRole = roles[roleId]
    const roleButtons = thisRole.sideBarButtons || []

    // Get the tasks
    const tasks = roleEl.querySelectorAll('.tasks li')
    const taskNames = Array.from(tasks).map(task => task.innerText)

    // get the privileges of the role
    const privileges = thisRole.privileges || []


    console.log("Opening edit role modal", { title, responsibility, roleId, committee, taskNames });


    // Set the title of the role
    if (title) {
        document.querySelector('#editRoleModal input#title').value = title;
    } else {
        // document.querySelector('#editRoleModal input#title').value = undefined;
    }
    // set the responsibility of the role
    if (responsibility) {
        console.log("setting responsibility text in edit modal", {responsibility})
        document.querySelector('#editRoleModal textarea#responsibility').value = responsibility;
    }


    // set the committee
    if (committee) {
        const select2 = document.querySelector('#editRoleModal select.committee-select2')
        $(select2).val(committee).trigger('change');
    }

    // set the role assignment
    if (roleAssignment) {
        const select2 = document.querySelector('#editRoleModal select.role-assignment-select2')
        $(select2).val(roleAssignment).trigger('change');
    } else {
        const select2 = document.querySelector('#editRoleModal select.role-assignment-select2')
        $(select2).val(null).trigger('change');
    }

    // Set the specific role tasks
    if (taskNames) {
        // The tasks are in a ul
        // This select2 needs to have it options cleared and reset per role

        const select2 = document.querySelector('#editRoleModal select.tasks-select2')

        // Clear the select2
        $(select2).val(null).trigger('change');
        // remove all options
        $(select2).empty();

        // Add the new options
        taskNames.forEach(task => {
            const option = new Option(task, task, true, true);
            select2.append(option);
        });

        $(select2).val(taskNames).trigger('change');
    }

    // Set the privileges
    if (privileges) {
        const select2 = document.querySelector('#editRoleModal select.privileges-select2')
        $(select2).val(privileges).trigger('change');
    } else {
        const select2 = document.querySelector('#editRoleModal select.privileges-select2')
        $(select2).val(null).trigger('change');
    }


    // set the role buttons
    if (roleButtons) {
        // const buttonNames = roleButtons.map(button => sideBarButtonNameMap[button])
        const buttonNames = roleButtons
        const select2 = document.querySelector('#editRoleModal select.sideBarButtons-select2')
        $(select2).val(buttonNames).trigger('change');
    } else {
        const select2 = document.querySelector('#editRoleModal select.sideBarButtons-select2')
        $(select2).val(null).trigger('change');
    }

    const modal = document.querySelector('#editRoleModal')
    modal.setAttribute('data-editing-role-id', roleId)

    modal.classList.add('show')
}

function setListenerToDeleteRole(){
    document.querySelector('#editRoleModal button#deleteRole').addEventListener('click', (e) => {
        if(!isBootStrapConfirmResponse(e)) return
        console.log("Delete Role clicked")
        // get the role id
        const roleId = document.querySelector('#editRoleModal').getAttribute('data-editing-role-id')
        
        // delete the role from db
        CRUD.delete('committee-roles', roleId).then(() => {
            console.log("Role deleted from db")
            // remove the role from the html    
            const roleEl = document.querySelector(`.role[data-role-id="${roleId}"]`)
            roleEl.remove()

            // save the html to the database
            saveCommitteeHTMLToDB()

            // close modal
            document.querySelector('#editRoleModal').classList.remove('show')
        })


        alert("DEV TODO: \n\nUpdate any users that are associated with the role. Users shouldn't have roles that don't exists (& they can only have 3 total!)")
        
        
        console.log({roleId})
    })
}