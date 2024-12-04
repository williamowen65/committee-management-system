import footerTemplate from './footer.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import styles from './style.scss.txt';



createCustomElement('footer-component', function () {


}, footerTemplate, styles);
