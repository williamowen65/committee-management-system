function editCommitteeButtons() {


    const htmlCommitteePositions = document.querySelector('#committee-positions')

    const committeeHeaders = Array.from(htmlCommitteePositions.querySelectorAll('h3'))

    committeeHeaders.forEach(h3 => {
        // // For every "committee",  have an edit button
        const editButton = createEditCommitteeBtn()
        h3.insertAdjacentElement('afterend', editButton)
        // Add the Add role button below the committee sections
        // find  committee section
        // const committeeSection = h3.closest('.committee')
        // const addCommitteeBtn = createEditCommitteeBtn()
        // committeeSection.insertAdjacentElement('afterend', addCommitteeBtn)
    })




    function createEditCommitteeBtn() {
        // This button appears as a line between committees
        const editButton = document.createElement('button')
        editButton.setAttribute('type', 'button')
        editButton.classList.add('small', 'edit-committee-btn', 'fa-solid', 'fa-users-medical', 'editor-control')
        editButton.setAttribute('title', "Edit Committee")


        const icon = document.createElement('i')
        icon.classList.add('fa', 'fa-users', 'icon-green')

        editButton.appendChild(icon)
        return editButton
    }




    fetch('modal/editCommittee/editCommittee.html').then(response => response.text()).then(html => {
        console.log("Fetched editCommittee.html", { html })


        const context = {
            committeeName: "[Content should be added when modal is opened]",
        }
        const processedHTML = html
            .replace(/{{committeeName}}/g, `${context.committeeName}`)


        document.body.insertAdjacentHTML('beforeend', processedHTML)
        moveLabel(document.getElementById('editCommitteeModal'))

        Array.from(document.querySelectorAll('.edit-committee-btn')).forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log("Edit Committee clicked", btn)
                const committeeEl = e.target.closest('.committee')
                const committeeHeaderEl = committeeEl.querySelector('.committee-title')
                // const roleId = roleEl.getAttribute('data-role-id')
                // const thisRole = roles[roleId]

                // get the committeeName
                // const committee = thisRole.committee
                const committeeHeaderText = committeeHeaderEl.textContent
                const committeeNameText = committeeHeaderEl.getAttribute('data-committee-title')
                // set the committeeName
                document.querySelector('#editCommitteeModal input[id=committee-name').value = committeeNameText.trim()
                document.querySelector('#editCommitteeModal input[id=committee-header').value = committeeHeaderText.trim()

                const committeeId = committeeEl.getAttribute('data-committee-id')
                // Set the data-editing-committee-id
                document.querySelector('#editCommitteeModal')
                    .setAttribute(
                        'data-editing-committee-id',
                        committeeId
                    )

                document.querySelector('#editCommitteeModal').classList.add('show')


            })
        })

        // set listener for deleting the committee
        document.querySelector('#deleteCommittee').addEventListener('click', (e) => {
            if (isBootStrapConfirmResponse(e)) {

                const modal = document.querySelector('#editCommitteeModal')
                const committeeId = modal.getAttribute('data-editing-committee-id')

                // delete the committee html
                const committeeEl = document.querySelector(`.committee[data-committee-id="${committeeId}"]`)
                committeeEl.remove()


                // save the html to the database
                saveCommitteeHTMLToDB()
        
                // delete the committee from the database
                CRUD.update('app-settings', 'committees', {
                    data: {
                        [committeeId]: firebase.deleteField()
                    }
                })

                // update any roles that are associated with the committee
                alert("DEV TODO: \n\nUpdate any roles that are associated with the committee. (the committee-roles collection) ) \n\nUpdate any users that are associated with the committee/role. Users shouldn't have roles that don't exists (& they can only have 3 total!)")

                // update any users that are associated with the committee/role

                console.log("Delete Committee", { e })

                modal.classList.remove('show')
            }
        })


        // Set listener for saving the committee
        document.querySelector('#editCommittee').addEventListener('click', (e) => {
            const modal = document.querySelector('#editCommitteeModal')
            const committeeId = modal.getAttribute('data-editing-committee-id')

            const payload = {
                data: {
                    [committeeId]: {
                        committee: document.querySelector('#editCommitteeModal input[id=committee-name').value,
                        'committee-header-text': document.querySelector('#editCommitteeModal input[id=committee-header').value,
                    }
                }
            }

            CRUD.update('app-settings', 'committees', payload).then(() => {
                // update the UI
                const committeeEl = document.querySelector(`.committee[data-committee-id="${committeeId}"]`)
                const committeeHeaderEl = committeeEl.querySelector('.committee-title')
                committeeHeaderEl.textContent = payload.data[committeeId]['committee-header-text']
                committeeHeaderEl.setAttribute('data-committee-title', payload.data[committeeId].committee)

                // close the modal
                const modal = document.querySelector('#editCommitteeModal')
                modal.classList.remove('show')

            }).then(() => {
                // Update select2 for the #editRoleModal
                const select2 = document.querySelector('#editRoleModal select.committee-select2')

                // Update a single option based on id
                const option = select2.querySelector(`option[value="${committeeId}"]`)
                option.textContent = payload.data[committeeId].committee

                // Update the select2
                $(select2).select2()




            })

            console.log("Edit Committee", { committeeId, payload })
        })
    })
}