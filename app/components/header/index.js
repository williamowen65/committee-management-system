import headerTemplate from './header.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import './style.scss';



createCustomElement('header-component', function () {

    // watch for the window change location event
    window.addEventListener('message', (e) => {
       console.log("message from parent or child window ", e)
    });

}, headerTemplate, '', {
    attributes: ['slotLinks']
});
