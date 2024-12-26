import roles from '../my-contract/committee-roles.js'
import '../../../utils/logIf.js'

const timeline = {}
const userRoles = {}
let configDocument;

document.addEventListener('DOMContentLoaded', function () {
  firebase.redirectIfNotLoggedIn('/artist-sign-on')
    .then(async (user) => {
      if (user) {

        document.body.style.display = 'block'
        const userDiv = document.querySelector('#user')
        userDiv.style.display = 'block'
        userDiv.querySelector('#username').innerHTML = `Hello, ${user.displayName}`





        // Add timeline event from the database to the timeline
        await CRUD.readAll('ghost-timeline').then(ghostTimeline => {
          // remove the configDocument
          ghostTimeline = ghostTimeline.filter(event => {
            if (event.fbId !== 'configDocument') return event
            else {
              configDocument = event
            }
          })

          // set the year to the configDocument year
          document.getElementById('activeYear').innerText = configDocument.activeYear


          ghostTimeline = ghostTimeline.sort((a, b) => new Date(b.date) - new Date(a.date)).reverse()
          console.log({ timeline: ghostTimeline })
          const timelineContainer = document.getElementById('timeline')
          ghostTimeline.forEach(event => {
            const li = document.createElement('li')
            li.setAttribute('data-id', event.fbId)
            li.innerHTML = `
            <strong>${event.date}: </strong>
            ${event.description}
            `
            timelineContainer.querySelector('ul').appendChild(li)

            // Add the event to the timeline object
            timeline[event.fbId] = event
          })

        })

        // Get the GHOST contract for the user
        CRUD.read('ghost-contracts', user.uid).then(contract => {
          logIf.client && console.log(contract)
          // Get role name
          contract.committeeRoleId = contract.committeeRoleId || []

          // Also assigns userRoles object
          const sidePanel = getGhostSidePanel(contract.committeeRoleId)

          applyPrivileges(userRoles)

          document.querySelector('#user-role').innerHTML = `<h3>My Committee Role${contract.committeeRoleId.length > 1 ? 's' : ''}:</h3>${sidePanel.trim() ? sidePanel : 'No role assigned'}`
        })


        function applyPrivileges(userRoles) {
          Object.values(userRoles).forEach(role => {
            if (role.privileges && role.privileges.includes('editTimeline')) {

              enableTimelinePrivileges()




            }

          })
        }


        function enableTimelinePrivileges() {

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




          // Create a template button
          const editButton = document.createElement('a')
          editButton.setAttribute('type', 'button')

          // Create a template form
          const editForm = document.createElement('form')
          editForm.classList.add('ifEditing') // <--- Conditionally show the element based on the parent attribute
          editForm.innerHTML = getTimeLineEditor()

          function getTimeLineEditor(options = {}) {
            console.log('getTimeLineEditor',{ options })
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

          // Using event delegation to handle the cancel button
          document.addEventListener('click', (e) => {
            // if the target has the class cancelTimelineEdit
            if (e.target.classList.contains('cancelTimelineEdit')) {
              // change out of edit mode
              e.target.closest('*[is-editing]').removeAttribute('is-editing')
            }


            if(e.target.classList.contains('deleteTimelineEvent')){
              const li = e.target.closest('li')

              // get confirmation
              if(!confirm('Are you sure you want to delete this event?')) return

              const fbId = li.getAttribute('data-id')
              CRUD.delete('ghost-timeline', fbId).then(() => {
                // remove the event from the timeline object
                delete timeline[fbId]
                // remove the event from the timeline
                li.remove()
              })
            }

            if(e.target.classList.contains('editTimeline')){
                // get the parent #timeline container and add the edit form
                const timeline = document.getElementById('timeline')
                timeline.toggleAttribute('is-editing')
            }


          })


          // make a clone of the form to add to the timeline
          const editFormClone = editForm.cloneNode(true)
          editFormClone.setAttribute('id', 'newTimelineEventForm')  /// <--- For adding new events to the timeline
          // add a title
          editFormClone.querySelector('legend').innerText = 'New Event'
          // Add the base "New Entry" form to the timeline
          document.getElementById('timeline').querySelector('ul')
            .insertAdjacentElement('afterbegin', editFormClone)
          // create edit button clone
          const createNewEventBtn = editButton.cloneNode(true)
          createNewEventBtn.setAttribute('class', 'fa fa-edit')
          createNewEventBtn.setAttribute('id', 'editTimeline')
          document.getElementById('timeline').insertAdjacentElement('afterbegin', createNewEventBtn)
         
          // add an event listener to the form
          editFormClone.addEventListener('submit', (e) => {
            // create a new event in the timeline
            e.preventDefault()
            const date = editFormClone.querySelector('input').value
            const description = editFormClone.querySelector('textarea').value
            // add the event to the timeline object
            CRUD.create('ghost-timeline', { date, description }).then((event) => {
              console.log({ event })
              // const id = event.id
              // add the event to the timeline object
              timeline[event.id] = event
              // add the event to the timeline
              const li = document.createElement('li')
              li.setAttribute('data-id', event.id)
                li.innerHTML = `
                <a type="button" class="fa fa-pen editEvent"></a>
                <span class="contentContainer">
                <strong>${new Date(date).toLocaleDateString('en-us', { month: 'long', day: 'numeric' })}: </strong>
                ${description}
                </span>
                <form class="editTimelineForm ifEditing">
                ${getTimeLineEditor()}
                </form>
                `
              li.querySelector('input').value = date
              li.querySelector('textarea').value = description
              // Append it in the correct position of the timeline (TODO <------------------------------)

              // find the correct spot to insert the new event
              const timelineEl = document.getElementById('timeline')
              const events = Array.from(timelineEl.querySelectorAll('li')).concat(li)
              events.sort((a, b) => new Date(b.querySelector('input[type=date]').value) - new Date(a.querySelector('input[type=date]').value)).reverse()

              // remove all the events
              timelineEl.querySelector('ul').innerHTML = ''
              // add the events back in the correct order
              events.forEach(event => {
                timelineEl.querySelector('ul').appendChild(event)
              })
              

              // stop the edit mode
              document.getElementById('timeline').removeAttribute('is-editing')
              // clear form
              editFormClone.reset()
            })
          })

          // Use delegation to handle the edit button
          document.addEventListener('click', (e) => {
            if (e.target.classList.contains('editEvent')) {
              // make sure none of the other events are in edit mode
              document.querySelectorAll('#timeline li').forEach(event => {
                event.removeAttribute('is-editing')
              })
              const li = e.target.closest('li')
              li.toggleAttribute('is-editing')
            }

          })

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
            const editFormClone = editForm.cloneNode(true)
            editFormClone.classList.add('editTimelineForm')
            // add a title
            editFormClone.querySelector('legend').innerText = 'Editing an event'
            const date = new Date(eventData.date + `, ${configDocument.activeYear}`)
            // console.log({ date })
            editFormClone.querySelector('input').value = date.toISOString().split('T')[0];
            editFormClone.querySelector('textarea').value = eventData.description
            

            event.appendChild(editFormClone)

          })





        }

        /**
         * Side Panels are unique based on the role of the user
         * 
         * @param {Array int} roleId
         */
        function getGhostSidePanel(roleIds) {
          if (!roleIds) return ''
          return roleIds.map(roleId => {
            const role = roles[roleId]
            const roleTitle = role.title
            const roleButtons = role.sideBarButtons
            const responsibility = role.responsibility
            logIf.memberSidePanel && console.log("Rendering Member SidePanel for role", { role })
            userRoles[roleId] = role

            let sidePanelHTML = `<h4>${roleTitle}</h4><div>${responsibility}</div>`
            let buttons = document.createElement('div')
            buttons.setAttribute('style', 'display: flex; flex-direction: column;')


            if (roleButtons) {
              if (roleButtons.includes('newApplications')) {
                buttons.insertAdjacentHTML('beforeend', newApplicationsSidePanel(role))
              }
              if (roleButtons.includes('newScholarshipApplications')) {
                buttons.insertAdjacentHTML('beforeend', newScholarshipApplicationsButton(role))
              }
              if (roleButtons.includes('contracts-received')) {
                buttons.insertAdjacentHTML('beforeend', allContractsButton(role))
              }
              if (roleButtons.includes('testEmail')) {
                buttons.insertAdjacentHTML('beforeend', testEmailButton(role))
              }
              if (roleButtons.includes('testSheets')) {
                buttons.insertAdjacentHTML('beforeend', testSheetsButton(role))
              }
              if (roleButtons.includes('processToSheets')) {
                buttons.insertAdjacentHTML('beforeend', textProcessToSheetsButton(role))
              }
              if (roleButtons.includes('createDriveFolder')) {
                buttons.insertAdjacentHTML('beforeend', textCreateDriveFolderButton(role))
              }
              if (roleButtons.includes('createDocument')) {
                buttons.insertAdjacentHTML('beforeend', testCreateDocumentButton(role))
              }

            }

            sidePanelHTML += buttons.outerHTML

            return sidePanelHTML


          }).join("")
        }
      }
    })

  document.querySelector('#reset-password').addEventListener('click', () => {
    const email = firebase.auth.currentUser.email
    firebase.sendPasswordResetEmail(firebase.auth, email).then(() => {
      alert(`Password reset email sent to ${email}`)
    })
  })

  document.getElementById('logout').addEventListener('click', () => {
    firebase.signOut(firebase.auth).then(() => {
      window.location.href = '/artist-sign-on'
    })
  })
})

/*

Workflow for processing docs to pdf

Get folder name
create folder
for each contract: create a document, add content, add to folder
for each contract: convert to pdf, add to folder

*/

function processContractsToPdf() {
  const folderName = prompt("Enter a name for the folder", "GHOST Contracts")
  if (!folderName) return

  window.sendMessageToParent({
    controller: 'driveController',
    action: 'createFolder',
    folderName: folderName
  })

  window.addEventListener("message", (event) => {
    if (event.data.dispatch !== 'driveController-response') return
    if (event.data.error) {
      alert('Error creating folder')
      return
    }
    // You can add additional logic here to handle the message
    // show success message
    alert('Folder created successfully')
    // get all contracts
    CRUD.readAll('ghost-contracts').then(contracts => {
      logIf.client || true && console.log({ contracts })
      contracts.forEach(contract => {
        const docName = `${contract.artistDetails.firstName} ${contract.artistDetails.lastName} Contract`
        window.sendMessageToParent({
          controller: 'docsController',
          action: 'createDoc',
          docName: docName
        })

        window.addEventListener("message", (event) => {
          if (event.data.dispatch !== 'docsController-response') return
          if (event.data.error) {
            alert('Error creating document')
            return
          }
          // You can add additional logic here to handle the message
          // show success message
          alert('Document created successfully')

          // add content to the document
          const docId = event.data.data.docId
          const content = `
          <h1>Gig Harbor Open Studio Tour Contract</h1>
          <p>Contract for ${contract.artistDetails.firstName} ${contract.artistDetails.lastName}</p>
          <p>Medium: ${contract.artistDetails.medium}</p>
          <p>Artist Statement: ${contract.artistDetails.artistStatement}</p>
          <p>Website: ${contract.artistDetails.website}</p>
          <p>Facebook: ${contract.artistDetails.facebook}</p>
          <p>Instagram: ${contract.artistDetails.instagram}</p>
          <p>Phone: ${contract.artistDetails.phone}</p>
          <p>Personal Email: ${contract.artistDetails.personalEmail}</p>
          <p>Business Email: ${contract.artistDetails.businessEmail}</p>
          <p>Images: ${contract.images.digitalImage1}, ${contract.images.digitalImage2}, ${contract.images.digitalImage3}, ${contract.images.artistInStudioImage}</p>
        }
        `
          window.sendMessageToParent({
            controller: 'docsController',
            action: 'addContent',
            docId: docId,
            content: content
          })

          window.addEventListener("message", (event) => {
            if (event.data.dispatch !== 'docsController-response') return
            if (event.data.error) {
              alert('Error adding content to document')
              return
            }
            // You can add additional logic here to handle the message
            // show success message
            alert('Content added to document successfully')

            // add document to folder
            window.sendMessageToParent({
              controller: 'driveController',
              action: 'addDocToFolder',
              docId: docId,
              folderId: event.data.data.folderId
            })

            window.addEventListener("message", (event) => {
              if (event.data.dispatch !== 'driveController-response') return
              if (event.data.error) {
                alert('Error adding document to folder')
                return
              }
              // You can add additional logic here to handle the message
              // show success message
              alert('Document added to folder successfully')

              // convert document to pdf
              window.sendMessageToParent({
                controller: 'docsController',
                action: 'convertToPdf',
                docId: docId
              })

              window.addEventListener("message", (event) => {
                if (event.data.dispatch !== 'docsController-response') return
                if (event.data.error) {
                  alert('Error converting document to pdf')
                  return
                }
                // You can add additional logic here to handle the message
                // show success message
                alert('Document converted to pdf successfully')

                // add pdf to folder
                window.sendMessageToParent({
                  controller: 'driveController',
                  action: 'addPdfToFolder',
                  pdfId: event.data.data.pdfId,
                  folderId: event.data.data.folderId
                })

                window.addEventListener("message", (event) => {
                  if (event.data.dispatch !== 'driveController-response') return
                  if (event.data.error) {
                    alert('Error adding pdf to folder')
                    return
                  }
                  // You can add additional logic here to handle the message
                  // show success message
                  alert('Pdf added to folder successfully')

                })

              })

            })

          })

        })

      })
    })

  })

}




function newApplicationsSidePanel(role) {

  setTimeout(() => {
    // listen to new applications changes
    CRUD.listen('new-applications', null, (newApplications) => {
      logIf.client && console.log({ newApplications })
      const totalToReview = newApplications.filter(app => app.hasBeenReviewed === false).length
      const badge = document.querySelector('a.new-applications .badge')
      badge.innerText = totalToReview
      badge.setAttribute('data-count', totalToReview)
    })

  }, 1)

  return `
      <a onclick="navigateTo('/new-applications')" class="new-applications">
        <button style="position: relative;">New Artist Applications Received <span class="badge" data-count="0"></span></button>
    </a>`
}

function newScholarshipApplicationsButton(role) {
  setTimeout(() => {
    CRUD.listen('scholarship-applications', null, (newApplications) => {
      logIf.client && console.log({ newApplications })
      const totalToReview = newApplications.filter(app => app.hasBeenReviewed === false).length
      const badge = document.querySelector('a.scholarship-applications .badge')
      badge.innerText = totalToReview
      badge.setAttribute('data-count', totalToReview)
    })
  })
  return `
      <a onclick="navigateTo('/scholarship-applications')" class="scholarship-applications">
        <button  style="position: relative;">Scholarships Received <span class="badge" data-count="0"></span></button>
    </a>`
}

function allContractsButton(role) {

  setTimeout(() => {
    // listen to new applications changes
    CRUD.readAll('ghost-contracts').then(contracts => {
      logIf.client || true && console.log({ contracts })
      const totalToReview = contracts.filter(contract => contract.artistDetails.membershipPaid).length
      const badge = document.querySelector('a.contracts-received .badge')
      badge.innerText = totalToReview
      badge.setAttribute('data-count', totalToReview)
    })

  }, 1)

  return `
      <a onclick="navigateTo('/contracts-received')" class="contracts-received">
        <button style="position: relative;">Contracts Received <span class="badge" data-count="0"></span></button>
    </a>`
}

/**
  payload:{
    controller: 'sheetsController',
    sheetName: string,
    spreadsheetId: string,
    action: ['upsert', 'delete'],
    data: {object}
  }
 */


function testSheetsButton(role) {
  setTimeout(() => {

    document.getElementById('generateSheets').addEventListener('click', () => {

      // get some input from user (for testing purposes)
      const data = document.querySelector('textarea').value

      window.sendMessageToParent({
        controller: 'sheetsController',
        sheetName: 'testSheet',
        spreadsheetId: '1sAka-Rs4LhHhkX3J4s7SaDlpIXEdv5R5Qm7meGIL6Wk',
        action: 'upsert',
        key: 'rowId',
        data: JSON.parse(data)
      })

      window.addEventListener("message", (event) => {
        if (event.data.dispatch !== 'sheetsController-response') return
        if (event.data.error) {
          alert('Error generating sheets')
          return
        }
        console.log("sheetsController-response", event)
        // You can add additional logic here to handle the message
        // show success message
        alert('Sheets generated successfully: ' + event.data.sheetUrl)
      })
    })
  }, 1)

  return `<button id="generateSheets" style="position: relative;">Test Sheets </button>
  <textarea style="height:100px; width: 200px;">
{
  "rowId": 1,
  "name": "",
  "email": "",
  "newField": 
}
  </textarea>
  `
}

function textCreateDriveFolderButton(role) {
  setTimeout(() => {
    document.getElementById('createDriveFolder').addEventListener('click', () => {
      window.sendMessageToParent({
        controller: 'driveController',
        action: 'createFolder',
        folderName: 'Test Folder'
      })

      window.addEventListener("message", (event) => {
        if (event.data.dispatch !== 'driveController-response') return
        if (event.data.error) {
          alert('Error creating folder')
          return
        }
        // You can add additional logic here to handle the message
        // show success message
        alert('Folder created successfully')
      })
    })
  }, 1)

  return `<button id="createDriveFolder" style="position: relative;">Create Drive Folder </button>`
}

function testCreateDocumentButton(role) {
  setTimeout(() => {
    document.getElementById('createDocument').addEventListener('click', () => {
      window.sendMessageToParent({
        controller: 'docsController',
        action: 'createDoc',
        docName: 'Test Document'
      })

      window.addEventListener("message", (event) => {
        if (event.data.dispatch !== 'docsController-response') return
        if (event.data.error) {
          alert('Error creating document')
          return
        }
        // You can add additional logic here to handle the message
        // show success message
        alert('Document created successfully')
      })
    })
  }, 1)

  return `<button id="createDocument" style="position: relative;">Create Drive Document </button>`
}

function textProcessToSheetsButton(role) {
  setTimeout(() => {
    document.getElementById('processToSheets').addEventListener('click', async () => {

      const sheetName = `GHOST Contracts ${new Date().getFullYear()}`
      if (!sheetName) return

      // get the text of the button
      const buttonText = document.getElementById('processToSheets').innerText
      // show loading sign
      document.getElementById('processToSheets').innerText = 'Loading...'

      // get all contracts
      const contracts = await CRUD.readAll('ghost-contracts').then(contracts => {
        return contracts.map(contract => {
          console.log({ contract })
          return {
            "GHOST Member Id": contract?.userId || "",
            "First Name": contract?.artistDetails?.firstName || "",
            "Last Name": contract?.artistDetails?.lastName || "",
            "Committee Role(s)": contract?.committeeRoleId?.map(roleId => roles[roleId]?.title).join(", ") || "",
            "Personal Email": contract?.artistDetails?.personalEmail || "",
            "Business Email": contract?.artistDetails?.personalEmail || "",
            "Phone": contract?.artistDetails?.phone || "",
            "Medium": contract?.artistDetails?.medium || "",
            "Artist Statement": contract?.artistDetails?.artistStatement || "",
            "Website": contract?.artistDetails?.website || "",
            "Facebook": contract?.artistDetails?.facebook || "",
            "Instagram": contract?.artistDetails?.instagram || "",
            'Digital Image 1': contract?.images?.digitalImage1 || "",
            'Digital Image 2': contract?.images?.digitalImage2 || "",
            'Digital Image 3': contract?.images?.digitalImage3 || "",
            'Artist in Studio Image': contract?.images?.artistInStudioImage || "",
          }
        })
      })

      window.sendMessageToParent({
        controller: 'sheetsController',
        sheetName: sheetName,
        spreadsheetId: '1cmfgdGc8L5li_kx79W9SO5-ZwukiaXxlV5EZ3o8RYpY', // spreadsheet "GHOST Spreadsheet Data"
        action: 'upsertAll',
        key: "GHOST Member Id",
        data: contracts,
        header: [
          "GHOST Member Id",
          "First Name",
          "Last Name",
          "Committee Role(s)",
          "Personal Email",
          "Business Email",
          "Phone",
          "Medium",
          "Artist Statement",
          "Website",
          "Facebook",
          "Instagram",
          'Digital Image 1',
          'Digital Image 2',
          'Digital Image 3',
          'Artist in Studio Image'
        ]
      })

      window.addEventListener("message", (event) => {
        // return button text to normal
        document.getElementById('processToSheets').innerText = buttonText


        if (event.data.dispatch !== 'sheetsController-response') return
        if (event.data.error) {
          alert('Error generating sheets')
          return
        }


        const data = event.data.data
        const sheetUrl = data.sheetUrl
        console.log("sheetsController-response", event)
        // You can add additional logic here to handle the message
        // show success message
        // alert('Sheets generated successfully: ' + data.sheetUrl)
        window.openUrl(sheetUrl)
      })
    })
  }, 1)

  return `<button id="processToSheets" style="position: relative;">Google Sheet Summary</button>
  `
}

function testEmailButton(role) {
  setTimeout(() => {
    document.getElementById('sendEmail').addEventListener('click', () => {

      const email = prompt("Enter an email address to send the test email", firebase.auth.currentUser.email)
      if (!email) return

      window.sendMessageToParent({
        controller: 'gmailController', to: email, subject: 'Test Email', body: `
        <div style="text-align:center">
        <h1>Congratulations on joining the <br>Gig Harbor Open Studio Tour</h1>
            <p>Here is your invoice for the membership fee</p>
            <fieldset style="width:fit-content; margin: auto;">
            <legend>Invoice</legend>
            <p style="margin:0;">Transaction ID: 123</p>
            <p style="margin:0;">Amount: 123}</p>
            <p style="margin:0;">Currency:USD</p>
            <p style="margin:0;">Status: complete </p>
            <p style="margin:0;">Created At: ${new Date().toLocaleString()}</p>
            </fieldset>
            <p>Thank you for your membership payment.</p>
            <p>Best Regards, <br>Gig Harbor Open Studio Tour</p>
        <div>

            `
      })

      window.addEventListener("message", (event) => {
        if (event.data.dispatch !== 'gmailController-response') return

        if (event.data.error) {
          alert('Error sending email')
          return
        }

        // You can add additional logic here to handle the message
        // show success message
        alert('Email is sent.')
        // redirect to the dashboard
      });



    }, 1)
  })
  return `        <button id="sendEmail" style="position: relative;">Test Email </button>`
}