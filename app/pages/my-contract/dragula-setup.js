window.dragulaRoleInstance = {}
window.dragulaCommitteeInstance = {}

function setUpDragula() {
    console.log("setUpDragula", { dragula });

    // Set up dragula for roles (within a committee)
    dragulaForRoles()

    // Set up dragula for committees
    dragulaForCommittees()

}


function dragulaForRoles() {
    const roleContainers = Array.from(document.querySelectorAll('.committee ol'));
    const handleSelector = 'drag-handle-role';

    roleContainers.forEach(committee => {
        // Add drag handle to each role within the committee
        const roles = Array.from(committee.querySelectorAll('.role .content'));
        roles.forEach(role => {
            const dragHandle = createDragHandle(handleSelector);
            role.insertAdjacentElement('afterbegin', dragHandle);
        });

        // Initialize Dragula for the current committee
        dragulaRoleInstance = dragula({
            containers: [committee],
            moves: function (el, source, handle, sibling) {
                const handleElement = handle.closest("." + handleSelector);
                console.log({ handleElement });
                if (!handleElement) return false;
                const isDraggable = handleElement.classList.contains(handleSelector)
                console.log({ isDraggable })
                return isDraggable

            },
            accepts: function (el, target, source, sibling) {
                return target === source; // Only allow dragging within the same committee
            }
        });

        // Optional: Add event listeners for drag and dragend if needed
        // dragulaRoleInstance.on('drag', function (el) {
        //     roles.forEach(role => {
        //         role.querySelector('ol').style.display = 'none';
        //     });
        // });

        dragulaRoleInstance.on('dragend', function (el) {
            saveCommitteeHTMLToDB()

        });
    });
}

window.saveCommitteeHTMLToDB = function() {
    // Save the entire #committee-positions to the database
    // Strip out editor-controls
    const committeeHTML = document.querySelector('#committee-positions')
    const clone = committeeHTML.cloneNode(true)
    const editorControls = clone.querySelectorAll('.editor-control', '.sr-only')
    editorControls.forEach(control => control.remove())

    const html = clone.outerHTML
    console.log("Committee HTML", { html })

    CRUD.update('app-settings', 'html-committee-positions', {
        "data": html
    }).then(() => {
        console.log("Committee HTML saved to DB")
    })
}

// Set up dragula for committees
function dragulaForCommittees() {
    const container = 'committee-positions';
    const handleSelector = 'drag-handle-committee'

    // add drag handle to each committee
    const committees = Array.from(document.querySelectorAll('.committee'))
    committees.forEach(committee => {

        const dragHandle = createDragHandle(handleSelector)
        committee.insertAdjacentElement('afterbegin', dragHandle)
    })

    dragulaCommitteeInstance = dragula({
        containers: [document.getElementById(container)],
        moves: function (el, source, handle, sibling) {
            const handleElement = handle.closest("." + handleSelector);
            if (!handleElement) return false;
            return handleElement.classList.contains(handleSelector);
        },
    });

    dragulaCommitteeInstance.on('drag', function (el) {
        committees.forEach(committee => {
            committee.querySelector('ol').style.display = 'none';
        });
    });

    dragulaCommitteeInstance.on('dragend', function (el) {
        committees.forEach(committee => {
            committee.querySelector('ol').style.display = 'block';
        });

        saveCommitteeHTMLToDB()


    });


    autoScroll([window], {
        margin: 20,
        maxSpeed: 10,
        scrollWhenOutside: true,
        autoScroll: function () {
            return this.down && dragulaCommitteeInstance.dragging;
        }
    });
}

function createDragHandle(handleSelector) {
    const dragHandle = document.createElement('div')
    dragHandle.classList.add(handleSelector, 'editor-control')
    dragHandle.style.display = 'inline-block';
    dragHandle.style.cursor = 'grab';
    dragHandle.addEventListener('mousedown', () => {
        dragHandle.style.cursor = 'grabbing';
    });
    dragHandle.addEventListener('mouseup', () => {
        dragHandle.style.cursor = 'grab';
    });
    dragHandle.innerHTML = '<i class="fa fa-bars"></i>'
    return dragHandle
}


// Method for adding single container to dragula instance
window.addContainerToDragula = function (dragulaInstance, container, handleSelector) {
    dragulaInstance.containers.push(container)

    // add a drag handle to the new container
    const dragHandle = createDragHandle(handleSelector)
    container.insertAdjacentElement('afterbegin', dragHandle)

    // Re-initialize dragula
    // dragulaInstance.destroy()
    // dragulaInstance = dragula(dragulaInstance)

    console.log("Dragula instance updated", { dragulaInstance, container, dragHandle })

}