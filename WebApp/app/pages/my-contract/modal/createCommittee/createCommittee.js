function createCommitteePermission() {
    const htmlCommitteePositions = document.querySelector('#committee-positions')

    const committeeHeaders = Array.from(htmlCommitteePositions.querySelectorAll('h3'))
    const addCommitteeBtn = createAddCommitteeBtn()
    addCommitteeBtn.querySelector('button').classList.add('small')
    addCommitteeBtn.setAttribute('first-committee-insert-btn', 'true')
    htmlCommitteePositions.insertAdjacentElement('beforebegin', addCommitteeBtn)

    committeeHeaders.forEach(h3 => {
        // Add the Add role button below the committee sections
        // find  committee section
        const committeeSection = h3.closest('.committee')
        const addCommitteeBtn = createAddCommitteeBtn()
        committeeSection.insertAdjacentElement('afterend', addCommitteeBtn)
    })


    document.querySelectorAll('.committee').forEach(committee => {
        committee.addEventListener('mouseover', (e) => {
            const prev = committee.previousElementSibling;
            if (prev && prev.classList.contains('insert-committee-container')) {
                prev.style.opacity = '1';
            }
            const next = committee.nextElementSibling;
            if (next && next.classList.contains('insert-committee-container')) {
                next.style.opacity = '1';
            }
        });

        committee.addEventListener('mouseout', (e) => {
            const prev = committee.previousElementSibling;
            if (prev && prev.classList.contains('insert-committee-container')) {
                prev.setAttribute('style', 'opacity: 0;');
            }
            const next = committee.nextElementSibling;
            if (next && next.classList.contains('insert-committee-container')) {
                next.setAttribute('style', 'opacity: 0;');
            }
        });
    });


    fetch('modal/createCommittee/createCommittee.html').then(response => response.text()).then(html => {
        console.log("Fetched createCommittee.html", { html })
        document.body.insertAdjacentHTML('beforeend', html)
        moveLabel(document.getElementById('createCommitteeModal'))

        Array.from(document.querySelectorAll('.insert-committee-btn')).forEach(btn => {
            btn.addEventListener('click', () => {
                console.log("Insert Committee", btn)

                // set the next committee id as an attribute of the modal
                const nextId = Object.values(ghostCommittees).reduce((acc, curr) => {
                    return Math.max(acc, parseInt(curr.id))
                }, 0) + 1

                const createCommitteeModal = document.querySelector('#createCommitteeModal')
                createCommitteeModal.setAttribute('data-next-id', nextId)

                // for most operations, insert html after the btn
                createCommitteeModal.committeeInsertionTarget = btn.closest('.insert-committee-container')



                createCommitteeModal.classList.add('show')
                // focus on the committee name input
                createCommitteeModal.querySelector('#committee-name').focus()
            })
        })


        // Add event listener to the submit button
        document.querySelector('#createCommitteeModal #createCommittee')
            .addEventListener('click', (e) => {
                const committeeName = document.querySelector('#createCommitteeModal #committee-name').value
                const committeeDescription = document.querySelector('#createCommitteeModal #committee-header').value

                // create new committee in the database (get next id)
                const nextId = document.querySelector('#createCommitteeModal').getAttribute('data-next-id')
                CRUD.update('app-settings', 'committees', {
                    data: {
                        [nextId]: {
                            committee: committeeName,
                            'committee-header-text': committeeDescription,
                            id: nextId
                        }
                    }
                })

                // create the html for the new committee
                const html = createHtmlForNewCommitteeInEditMode(nextId, committeeName, committeeDescription)
                // insert the new html in the page
                const target = document.querySelector('#createCommitteeModal').committeeInsertionTarget
                if (target.hasAttribute('first-committee-insert-btn')) {
                    target.closest('#committee-positions-container').querySelector('#committee-positions')
                        .insertAdjacentElement('afterbegin', html)
                } else {
                    target.insertAdjacentElement('afterend', html)
                }

                // save the new html in the database
                saveCommitteeHTMLToDB()

                // close the modal

                document.querySelector('#createCommitteeModal').classList.remove('show')

                console.log("Create Committee clicked", {
                    committee: committeeName,
                    'committee-header-text': committeeDescription,
                    id: nextId
                })

            })
    })

}

function createAddCommitteeBtn() {
    // This button appears as a line between committees
    const insertCommitteeContainer = document.createElement('div')
    insertCommitteeContainer.classList.add('insert-committee-container', 'editor-control')

    const addCommitteeBtn = document.createElement('button')
    addCommitteeBtn.setAttribute('type', 'button')
    const icon = document.createElement('i')
    icon.classList.add('fa', 'fa-plus')
    addCommitteeBtn.appendChild(icon)

    const icon2 = document.createElement('i')
    icon2.classList.add('fa', 'fa-users', 'icon-green')
    addCommitteeBtn.appendChild(icon2)


    addCommitteeBtn.classList.add('insert-committee-btn')
    addCommitteeBtn.setAttribute('title', "Insert Committee")
    // addCommitteeBtn.innerText = "Add Committee"
    insertCommitteeContainer.appendChild(addCommitteeBtn)

    const line = document.createElement('div')
    const line2 = document.createElement('div')
    line.classList.add('line', 'right')
    line2.classList.add('line', 'left')
    insertCommitteeContainer.appendChild(line)
    insertCommitteeContainer.appendChild(line2)


    return insertCommitteeContainer
}


function createHtmlForNewCommitteeInEditMode(nextId, committeeName, committeeDescription) {
    const newCommittee = document.createElement('div')
    newCommittee.classList.add('committee')
    newCommittee.setAttribute('data-committee-id', nextId)

    const h3 = document.createElement('h3')
    h3.classList.add('committee-title')
    h3.setAttribute('data-committee-title', committeeName)
    h3.innerText = committeeDescription
    newCommittee.appendChild(h3)

    const ol = document.createElement('ol')
    newCommittee.appendChild(ol)

    const insertCommitteeContainer = createAddCommitteeBtn()
    newCommittee.insertAdjacentElement('afterend', insertCommitteeContainer)


    // Add the editor-controls to the committee
    // dragula, edit committee button
    addContainerToDragula(dragulaCommitteeInstance, newCommittee, 'drag-handle-committee')



    return newCommittee
}