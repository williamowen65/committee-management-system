import roles from '../my-contract/committee-roles.js'
import '../../../utils/logIf.js'


const userRoles = {}

document.addEventListener('DOMContentLoaded', function () {
  firebase.redirectIfNotLoggedIn('/artist-sign-on')
    .then(user => {
      if (user) {

        document.body.style.display = 'block'
        const userDiv = document.querySelector('#user')
        userDiv.style.display = 'block'
        userDiv.querySelector('#username').innerHTML = `Hello, ${user.displayName}` 
        

        CRUD.read('ghost-contracts', user.uid).then(contract => {
          logIf.client && console.log(contract)
          // Get role name
          contract.committeeRoleId = contract.committeeRoleId || []
          const sidePanel = getGhostSidePanel(contract.committeeRoleId)

          document.querySelector('#user-role').innerHTML = `<h3>My Committee Role${contract.committeeRoleId.length > 1 ? 's' : ''}:</h3>${sidePanel.trim() ? sidePanel : 'No role assigned'}`
        })

   

        /**
         * Side Panels are unique based on the role of the user
         * 
         * @param {Array int} roleId
         */
        function getGhostSidePanel(roleIds) {
          if (!roleIds) return ''
          return roleIds.map(roleId => {
            const role = roles[roleId].title
            const roleButtons = roles[roleId].sideBarButtons
            const responsibility = roles[roleId].responsibility
            logIf.memberSidePanel && console.log("Rendering Member SidePanel for role", { role })
            userRoles[roleId] = role

            let sidePanelHTML = `<h4>${role}</h4><div>${responsibility}</div>`
            let buttons = document.createElement('div')
            buttons.setAttribute('style', 'display: flex; flex-direction: column;')


            if (roleButtons) {
              if(roleButtons.includes('newApplications')) {
                buttons.insertAdjacentHTML('beforeend',newApplicationsSidePanel(role))
              }
              if(roleButtons.includes('newScholarshipApplications')) {
                buttons.insertAdjacentHTML('beforeend',newScholarshipApplicationsButton(role))
              }
              if(roleButtons.includes('contracts-received')) {
                buttons.insertAdjacentHTML('beforeend',allContractsButton(role))
              }
              if(roleButtons.includes('testEmail')) {
                buttons.insertAdjacentHTML('beforeend',testEmailButton(role))
              }
              if(roleButtons.includes('testSheets')) {
                buttons.insertAdjacentHTML('beforeend',testSheetsButton(role))
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

function newApplicationsSidePanel(role) {

  setTimeout(() => {
    // listen to new applications changes
    CRUD.listen('new-applications', null, (newApplications) => {
      logIf.client && console.log({ newApplications })
      const totalToReview = newApplications.filter(app => app.hasBeenReviewed === false).length
      const badge = document.querySelector('a[href="/new-applications"] .badge')
      badge.innerText = totalToReview
      badge.setAttribute('data-count', totalToReview)
    })
  
  }, 1)

  return `
      <a href="/new-applications">
        <button style="position: relative;">New Artist Applications Received <span class="badge" data-count="0"></span></button>
    </a>`
}

function newScholarshipApplicationsButton(role) {
  setTimeout(() => {
    CRUD.listen('scholarship-applications', null, (newApplications) => {
      logIf.client && console.log({ newApplications })
      const totalToReview = newApplications.filter(app => app.hasBeenReviewed === false).length
      const badge = document.querySelector('a[href="/scholarship-applications"] .badge')
      badge.innerText = totalToReview
      badge.setAttribute('data-count', totalToReview)
    })
  })
  return `
      <a href="/scholarship-applications">
        <button  style="position: relative;">Scholarships Received <span class="badge" data-count="0"></span></button>
    </a>`
}

function allContractsButton(role) {

  setTimeout(() => {
    // listen to new applications changes
    CRUD.readAll('ghost-contracts').then(contracts => {
        logIf.client || true && console.log({ contracts })
        const totalToReview = contracts.filter(contract => contract.artistDetails.membershipPaid).length
        const badge = document.querySelector('a[href="/contracts-received"] .badge')
        badge.innerText = totalToReview
        badge.setAttribute('data-count', totalToReview)
    })
  
  }, 1)

  return `
      <a href="/contracts-received">
        <button style="position: relative;">Contracts Received <span class="badge" data-count="0"></span></button>
    </a>`
}


function testSheetsButton(role){
  setTimeout(()=> {
    document.getElementById('generateSheets').addEventListener('click', () => {
      window.sendMessageToParent({ controller: 'sheetsController'} )

      window.addEventListener("message", (event) => {
        if(event.data.dispatch !== 'sheetsController-response') return
        if (event.data.error) {
          alert('Error generating sheets')
          return
        }
        // You can add additional logic here to handle the message
        // show success message
        alert('Sheets generated successfully')
      })
    })
  }, 1)

  return `<button id="generateSheets" style="position: relative;">Test Sheets </button>`
}

function testEmailButton(role){
  setTimeout(()=> {
    document.getElementById('sendEmail').addEventListener('click', () => {
   
      window.sendMessageToParent({ controller: 'gmailController', to: 'william.owen.career@gmail.com', subject: 'Test Email', body: `
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
    if(event.data.dispatch !== 'gmailController-response') return

    if (event.data.error) {
      alert('Error sending email')
      return
    }

    // You can add additional logic here to handle the message
    // show success message
    alert('Membership payment successful: Email is being sent.')
    // redirect to the dashboard
    window.location.href = '/test'
  });



    }, 1)
  })
  return `        <button id="sendEmail" style="position: relative;">Test Email </button>`
}