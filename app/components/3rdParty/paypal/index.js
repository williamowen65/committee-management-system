import paypalTemplate from './index.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../../utils/custom-element';
// import styles from './style.scss.txt';



createCustomElement('paypal-component', function () {


}, paypalTemplate, "");
