import dualLoginForm from './index.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import styles from './style.scss.txt';



createCustomElement('dual-login-form-component', function () {

    setUXEventListeners.bind(this)();

}, dualLoginForm, styles);


function setUXEventListeners(){
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
        this.querySelector('.login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = this.querySelector('.login-form input[type="email"]').value;
            const password = this.querySelector('.login-form input[type="password"]').value;
            console.log({email, password});
        })



}