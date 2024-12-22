import headerTemplate from './header.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import './style.scss';



createCustomElement('header-component', function () {

    // watch for the window change location event
    window.addEventListener('change-location', (e) => {
        console.log('change-location', e.detail);

        // set the top location to the same path
        // window.top.location.href = e.detail;
    });

}, headerTemplate, '', {
    attributes: ['slotLinks']
});
