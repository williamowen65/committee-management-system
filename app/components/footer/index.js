import footerTemplate from './footer.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import './style.scss';



createCustomElement('footer-component', function () {


}, footerTemplate, '');
