import applicationTemplate from './index.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import styles from './style.scss.txt';



createCustomElement('application-component', function () {

    console.log(`application-component loaded`);

}, applicationTemplate, styles);
