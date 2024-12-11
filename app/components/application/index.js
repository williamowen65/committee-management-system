import applicationTemplate from './index.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import styles from './style.scss.txt';



createCustomElement('application-component', function () {

        

        // console.log(`application-component loaded`);
    
        // // set the radio buttons... check attribute
        // const isWithinBoundaries = this.getAttribute('isWithinBoundaries');
        // const radioButton = this.querySelector(`input[value="${isWithinBoundaries}"]`);
        // console.log({radioButton})
        // radioButton.checked = true;

        this.querySelector('button.expandApplication').addEventListener('click', (e) => {
            const application = this.querySelector('.artist-application-review');
            application.classList.toggle('expanded');
        })

}, applicationTemplate, styles);




// export function toggleApplication(event){
//     event.target.closest('.artist-application-review').classList.toggle('expanded');
    
// }