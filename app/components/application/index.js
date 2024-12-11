import applicationTemplate from './index.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import styles from './style.scss.txt';



createCustomElement('application-component', function () {

        
    // Fot some reason whe nthe component is loaded via javascript, this call back doesnt fire.

    // events must be inline

}, applicationTemplate, styles);


window.updateReview = function (event) {
  alert("update review")
}

// export function toggleApplication(event){
//     event.target.closest('.artist-application-review').classList.toggle('expanded');
    
// }