import roles from '../my-contract/committee-roles.js'


const userRoles = {}

document.addEventListener('DOMContentLoaded', function () {
  firebase.redirectIfNotLoggedIn('/artist-sign-on')
    .then(user => {
      if (user) {

        document.body.style.display = 'block'
        document.querySelector('#username').innerText = `Hello, ${user.displayName}`

        CRUD.read('ghost-contracts', user.uid).then(contract => {
          console.log(contract)
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
            console.log({ role })
            userRoles[roleId] = role

            let sidePanelHTML = `<h4>${role}</h4>`
            if(role === 'New Artist Applications Chair') {
              sidePanelHTML += newApplicationsSidePanel(role)
            } else if (role === 'President'){
              sidePanelHTML += [newApplicationsSidePanel(role), newScholarshipApplicationsButton(role)].join("")
            } else if (["President","Vice President", "Treasurer", "Secretary", "Member-At-Large"].includes(role)){
              sidePanelHTML += [newScholarshipApplicationsButton(role)].join("")

            } 
            else {
              return ``
            }
            return sidePanelHTML

            // switch (role) {

            //   case 'New Artist Applications Chair':
            //   case 'President':
            //     return newApplicationsSidePanel(role)


            //   case 'Artist Applications Chair':
            //   default:
            //     return `<h4>${role}</h4>`
            // }
          }).join("")
        }
      }
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
      console.log({ newApplications })
      const totalToReview = newApplications.filter(app => app.hasBeenReviewed === false).length
      const badge = document.querySelector('.badge')
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
  return `
      <a href="/scholarship-applications">
        <button>New Scholarship Applications Received</button>
    </a>`
}