 import roles from '../my-contract/committee-roles.js'

document.addEventListener('DOMContentLoaded', function() {
    firebase.redirectIfNotLoggedIn('/artist-sign-on')
.then(user => {
  if(user){

    document.body.style.display = 'block'
    document.querySelector('#username').innerText = `Hello, ${user.displayName}`

    CRUD.read('ghost-contracts', user.uid).then(contract => {
      console.log(contract)
      // Get role name

      const sidePanel = getGhostSidePanel(contract.committeeRoleId)

      document.querySelector('#user-role').innerHTML = `<h3>Committee Role:</h3>${sidePanel.trim() ? sidePanel : 'No role assigned'}`
    })

    /**
     * Side Panels are unique based on the role of the user
     * 
     * @param {Array int} roleId
     */
    function getGhostSidePanel(roleIds) {
      return roleIds.map(roleId => {
        const role = roles[roleId].title
        console.log({role})
        switch (role) {
            case 'New Artist Applications Chair':
                return `
                <h4>${role}</h4>
                  <a href="/new-applications">
                    <button style="position: relative;">New Artist Applications <span class="badge">4</span></button>
                </a>`
        
            default:
                return `<h4>${role}</h4>`
        }
      }).join("")
    }
  }
})

document.addEventListener('DOMContentLoaded',() =>{
  document.getElementById('logout').addEventListener('click', () => {
    firebase.signOut(firebase.auth).then(() => {
      window.location.href = '/artist-sign-on'
    })
  })
})
})