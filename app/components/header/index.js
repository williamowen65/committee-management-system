import headerTemplate from './header.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import './style.scss';



createCustomElement('header-component', function () {



}, headerTemplate, '', {
    attributes: ['slotLinks']
});
