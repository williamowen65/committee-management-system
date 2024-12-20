import contractReceived from './index.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
// import './style.scss';



createCustomElement('contract-received', function () {

console.log("hi")

}, contractReceived, '');
