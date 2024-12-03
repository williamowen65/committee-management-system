import dualLoginForm from './index.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import styles from './style.scss.txt';



createCustomElement('dual-login-form-component', function () {

    setUXEventListeners.bind(this)();

}, dualLoginForm, styles);


function setUXEventListeners() {
    // Change form from signup to login
    const dividerEl = this.querySelector('.os-dual-form')
    this.querySelectorAll('.toggleAuthType').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.stopPropagation()
            dividerEl.getAttribute('auth-mode') === 'login' ? dividerEl.setAttribute('auth-mode', 'signup') : dividerEl.setAttribute('auth-mode', 'login')
            //  writeFriendlyMessage();
        })
    })

    // handle submit event for login form
    this.querySelector('form#login').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;

        return firebase.signInWithEmailAndPassword(firebase.auth, email, password).then((user) => {
            // redirect to members
            console.log('redirecting to members page');
            window.location.href = '/members'
        })

    })

    // handle submit event for signup form
    this.querySelector('form#signup').addEventListener('submit', function(e) {
        e.preventDefault();
        const button = this;
        const firstName = button.querySelector('input[id="firstName"]').value;
        const lastName = button.querySelector('input[id="lastName"]').value;
        const email = button.querySelector('input[id="email"]').value;
        const username = button.querySelector('input[id="username"]').value;
        const password = button.querySelector('input[id="password"]').value;
        const confirmPassword = button.querySelector('input[id="confirm-password"]').value;

    console.log("about to create user with email and password", {email, password, auth: firebase.auth});

        return firebase.createUserWithEmailAndPassword(firebase.auth, email, password).then(function(result) {
            console.log("result", result);
            return firebase.updateProfile(result.user, {
                displayName: username
            })
          }).then((user) => {
            // redirect to members
            console.log('redirecting to members page');
            window.location.href = '/members'
        })

    })



}