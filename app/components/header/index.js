import headerTemplate from './header.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import styles from './style.scss.txt';



createCustomElement('header-component', function () {


}, headerTemplate, styles);
