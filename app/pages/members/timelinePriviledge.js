export function enableTimelinePrivileges(configDocument, timeline) {

    setYearSelection()

    const { editButton, editForm } = createTemplates()

    setEventDelegation()

    appendCreateEventEditor()

    appendUpdateEventEditors()


    return

    function appendCurrentTimeline(li) {
        console.log('appendCurrentTimeline', { li })
        // find the correct spot to insert the new event
        const timelineEl = document.getElementById('timeline')
        const events = Array.from(timelineEl.querySelectorAll('li'))
        if (li) {
            events.concat(li)
        }
        events.sort((a, b) => new Date(b.querySelector('input[type=date]').value) - new Date(a.querySelector('input[type=date]').value)).reverse()
        console.log({ events })
        // remove all the events
        timelineEl.querySelector('ul').innerHTML = ''
        // add the events back in the correct order
        events.forEach(event => {
            timelineEl.querySelector('ul').appendChild(event)
        })
    }




    function createTemplates() {
        // Create a template button
        const editButton = document.createElement('a')
        editButton.setAttribute('type', 'button')

        // Create a template form
        const editForm = document.createElement('form')
        editForm.classList.add('ifEditing') // <--- Conditionally show the element based on the parent attribute
        editForm.innerHTML = getTimeLineEditor()
        return { editButton, editForm }
    }


    function getTimeLineEditor(options = {}) {
        console.log('getTimeLineEditor', { options })
        return `
            <fieldset>
              <legend></legend>
  
              <input required type="date" min="${configDocument.activeYear}-01-01" max="${configDocument.activeYear}-12-31"><br>
  
              <textarea required style="width:100%" type="text" placeholder="Description"></textarea>
  
              <br>
  
              <div style="display:flex; justify-content:right">
              <button class="small" type="submit">Save</button>
              <button class="small cancelTimelineEdit" type="button">Cancel</button>
              <button class="small deleteTimelineEvent" type="button">Delete</button>
              </div>
            </fieldset>
  
          `
    }


    function setYearSelection() {


        // add a way to change the selected year
        const activeYearContainer = document.getElementById('activeYear')

        // A button to toggle editing mode
        const changeYearBtn = document.createElement('a')
        changeYearBtn.setAttribute('type', 'button')
        changeYearBtn.setAttribute('class', 'fa fa-calendar')
        changeYearBtn.setAttribute('style', 'margin-left: 10px')
        changeYearBtn.innerHTML = '<small style="margin-left: 10px"></small>'
        changeYearBtn.addEventListener('click', () => {
            activeYearContainer.toggleAttribute('is-editing')
        })


        // A form to change the year
        const changeYearForm = document.createElement('form')
        changeYearForm.setAttribute('id', 'changeYearForm')
        changeYearForm.classList.add('ifEditing') // <--- Conditionally show the element based on the parent attribute
        // Define the form html
        changeYearForm.innerHTML = `
             <select>
                ${Array.from({ length: 3 }, (_, i) => {
            const year = new Date().getFullYear() - i + 2;
            return `<option value="${year}">${year}</option>`;
        }).join('')}
              </select>
              <button class="small" type="submit">Save</button>
              `
        // select the current year
        changeYearForm.querySelector('select').value = configDocument.activeYear

        // add an event listener to the form
        changeYearForm.addEventListener('submit', (e) => {
            // save to ghost-timeline/configDocument { activeYear: year }
            e.preventDefault()
            const year = changeYearForm.querySelector('select').value
            // set the active year in the configDocument
            configDocument.activeYear = year
            // save the configDocument
            CRUD.update('ghost-timeline', 'configDocument', configDocument).then(() => {
                // update the active year
                activeYearContainer.querySelector('.contentContainer .year').innerText = year
                // // update the active year in the timeline
                document.getElementById('timeline').querySelectorAll('li').forEach(li => {
                    li.querySelector('input[type=date]').setAttribute('min', `${year}-01-01`)
                    li.querySelector('input[type=date]').setAttribute('max', `${year}-12-31`)
                    // rerender the date input
                    const date = new Date(timeline[li.getAttribute('data-id')].date + `, ${year}`)
                    li.querySelector('input[type=date]').value = date.toISOString().split('T')[0]


                    /**
                     * Something weird might be happening here that the dates change when the year is updated ...
                     * NOPE: I just checked, and this is not the case
                    */

                    // update the date in the timeline object in the database
                    const fbId = li.getAttribute('data-id')
                    CRUD.update('ghost-timeline', fbId, { date: date.toISOString().split('T')[0] })

                })

                // change out of edit mode
                activeYearContainer.removeAttribute('is-editing')
            })
        })

        // create container around the content of the li
        const contentContainer = document.createElement('span')
        contentContainer.setAttribute('class', 'contentContainer')
        const yearContainer = document.createElement('span')
        yearContainer.setAttribute('class', 'year')
        contentContainer.appendChild(yearContainer)
        // put all the content from the li in the container by moving the nodes
        while (activeYearContainer.firstChild) {
            yearContainer.appendChild(activeYearContainer.firstChild)
        }
        // append the container to the li
        activeYearContainer.appendChild(contentContainer)
        contentContainer.insertAdjacentElement('beforeend', changeYearBtn)



        activeYearContainer.insertAdjacentElement('beforeend', changeYearForm)

    }

    function setEventDelegation() {
        // Using event delegation to handle the cancel button
        document.addEventListener('click', (e) => {
            // if the target has the class cancelTimelineEdit
            if (e.target.classList.contains('cancelTimelineEdit')) {
                // change out of edit mode
                e.target.closest('*[is-editing]').removeAttribute('is-editing')

                // reset the form to the original values
                const li = e.target.closest('li')
                const eventId = li.getAttribute('data-id')
                const eventData = timeline[eventId]

                li.querySelector('input').value = new Date(eventData.date + `, ${configDocument.activeYear}`).toISOString().split('T')[0]
                li.querySelector('textarea').value = eventData.description

            }


            if (e.target.classList.contains('deleteTimelineEvent')) {
                const li = e.target.closest('li')

                // get confirmation
                if (!confirm('Are you sure you want to delete this event?')) return

                const fbId = li.getAttribute('data-id')
                CRUD.delete('ghost-timeline', fbId).then(() => {
                    // remove the event from the timeline object
                    delete timeline[fbId]
                    // remove the event from the timeline
                    li.remove()
                })
            }

            if (e.target.closest('#editTimeline')) {
                // get the parent #timeline container and add the edit form
                const timeline = document.getElementById('timeline')
                timeline.toggleAttribute('is-editing')
            }

            if (e.target.classList.contains('editEvent')) {
                // make sure none of the other events are in edit mode
                document.querySelectorAll('#timeline li').forEach(event => {
                    event.removeAttribute('is-editing')
                })
                const li = e.target.closest('li')
                li.toggleAttribute('is-editing')
            }

            if (e.target.closest('#updateEvent')) {
                const li = e.target.closest('li');
                const eventId = li.getAttribute('data-id');
                const dateInput = li.querySelector('input')
                const date = dateInput.value;
                const description = li.querySelector('textarea').value;

                // update the event in the timeline object
                timeline[eventId].date = date;
                timeline[eventId].description = description;

                // update the event in the database
                CRUD.update('ghost-timeline', eventId, { date, description }).then(() => {
                    // update the display
                    const [year, month, day] = dateInput.value.split('-');
                    const date = new Date(year, month - 1, day); // Months are 0-indexed in JavaScript
                    console.log(date);

                    li.querySelector('.contentContainer').innerHTML = `
        <strong>${new Date(date).toLocaleDateString('en-us', { month: 'long', day: 'numeric' })}: </strong>
        ${description}
      `;
                    // exit edit mode
                    li.removeAttribute('is-editing');

                    appendCurrentTimeline()
                });
            }


        })

    }


    function appendCreateEventEditor() {

        // make a clone of the form to add to the timeline
        const newEventForm = editForm.cloneNode(true)
        newEventForm.setAttribute('id', 'newTimelineEventForm')  /// <--- For adding new events to the timeline
        // add a title
        newEventForm.querySelector('legend').innerText = 'New Event'
        // Add the base "New Entry" form to the timeline
        document.getElementById('timeline').querySelector('ul')
            .insertAdjacentElement('beforebegin', newEventForm)
        // create edit button clone
        const createNewEventBtn = editButton.cloneNode(true)
        createNewEventBtn.setAttribute('class', 'fa fa-edit')
        createNewEventBtn.setAttribute('id', 'editTimeline')
        document.getElementById('timeline').insertAdjacentElement('afterbegin', createNewEventBtn)

        // add an event listener to the form
        newEventForm.addEventListener('submit', (e) => {
            // create a new event in the timeline
            e.preventDefault()
            const dateVal = newEventForm.querySelector('input').value
            console.log({ dateVal })
            const description = newEventForm.querySelector('textarea').value
            // add the event to the timeline object
            CRUD.create('ghost-timeline', { date: dateVal, description }).then((event) => {
                console.log({ event })
                // const id = event.id
                // add the event to the timeline object
                timeline[event.id] = event
                // add the event to the timeline
                const li = document.createElement('li')
                li.setAttribute('data-id', event.id)
                const [year, month, day] = dateVal.split('-');
                const dateObj = new Date(year, month - 1, day); // Months are 0-indexed in JavaScript
                li.innerHTML = `
          <a type="button" class="fa fa-pen editEvent"></a>
          <span class="contentContainer">
          <strong>${dateObj.toLocaleDateString('en-us', { month: 'long', day: 'numeric' })}: </strong>
          ${description}
          </span>
          <form class="editTimelineForm ifEditing">
          ${getTimeLineEditor()}
          </form>
          `
                li.querySelector('input').value = dateObj
                li.querySelector('textarea').value = description

                // add the form to the event
                li.querySelector('button[type=submit]').setAttribute('id', 'updateEvent')
                li.querySelector('form').addEventListener('submit', (e) => {
                    e.preventDefault()
                    // event wired up via button (delegated event listener)
                })

                // add li to the timeline
                document.getElementById('timeline').querySelector('ul').appendChild(li)

                // Append it in the correct position of the timeline (TODO <------------------------------)
                appendCurrentTimeline()


                // stop the edit mode
                document.getElementById('timeline').removeAttribute('is-editing')
                // clear form
                newEventForm.reset()
            })
        })
    }


    function appendUpdateEventEditors() {

        // loop through all the event and add a local edit button and edit form (which populates the form with the event data)
        document.querySelectorAll('#timeline li').forEach(event => {

            // get the id of the event 
            const eventId = event.getAttribute('data-id')
            // get the event data from the time line object
            const eventData = timeline[eventId]

            // console.log('cloning button to li', { event })

            // create container around the content of the li
            const contentContainer = document.createElement('span')
            contentContainer.setAttribute('class', 'contentContainer')
            // put all the content from the li in the container by moving the nodes
            while (event.firstChild) {
                contentContainer.appendChild(event.firstChild)
            }
            // append the container to the li
            event.appendChild(contentContainer)


            // clone a button to the event
            const editButtonClone = editButton.cloneNode(true)
            editButtonClone.setAttribute('class', 'fa fa-pen editEvent')
            event.insertAdjacentElement('afterbegin', editButtonClone)


            // clone the form to the event
            const editEventForm = editForm.cloneNode(true)
            editEventForm.classList.add('editTimelineForm')

            // add a title
            editEventForm.querySelector('legend').innerText = 'Editing an event'
            const date = new Date(eventData.date + `, ${configDocument.activeYear}`)
            // console.log({ date })
            editEventForm.querySelector('input').value = date.toISOString().split('T')[0];
            editEventForm.querySelector('textarea').value = eventData.description

            editEventForm.querySelector('button[type=submit]').setAttribute('id', 'updateEvent')
            // add the form to the event
            editEventForm.addEventListener('submit', (e) => {
                e.preventDefault()
                // event wired up via button (delegated event listener)
            })

            event.appendChild(editEventForm)

        })

    }


}



