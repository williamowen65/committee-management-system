document.addEventListener('DOMContentLoaded', () => {
    // add listener to reset password button
    document.getElementById('reset-password').addEventListener('click', () => {
        // open modal
        document.getElementById('reset-password-modal').style.display = 'block'

        // const email = document.getElementById('email').value
        // firebase.resetPassword(email).then(() => {
        //     alert('Password reset email sent')
        // }).catch((error) => {
        //     alert(error.message)
        // })
    })
})