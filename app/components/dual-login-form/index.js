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
}