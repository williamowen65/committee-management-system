import applicationTemplate from './index.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import styles from './style.scss.txt';



createCustomElement('application-component', function () {

        
    // Fot some reason whe nthe component is loaded via javascript, this call back doesnt fire.

    // events must be inline

}, applicationTemplate, styles);


window.updateReview = function (event, reviewAnswer) {
    console.log("updateReview", event)
    // update button to loading
    const button = event.target;
    const btnText = button.innerHTML
    button.setAttribute('disabled', 'disabled')
    button.innerHTML = 'Loading...'

    // get the fbId
    const fbId = button.getAttribute('data-fb-id');


  CRUD.update('new-applications', fbId, 
    {hasBeenReviewed: true, approved: reviewAnswer} )
  .then(() =>{

    // update the button text
    button.innerHTML = 'Review Submitted'
    setTimeout(() => {
      button.removeAttribute('disabled')
      button.innerHTML = btnText
    }, 3000)

    // move and collapse the application
  })
}

// export function toggleApplication(event){
//     event.target.closest('.artist-application-review').classList.toggle('expanded');
    
// }