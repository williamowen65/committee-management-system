import inputTemplate from './types/text-input.html.txt';
import textareaTemplate from './types/textarea-input.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import styles from './style.scss.txt';



createCustomElement('input-component', function () {
    console.log('input-component loaded');
    // set slot
    // Evaluate the template (initially with default context)
    // const defaultContext = {
    //     fieldName: this.getAttribute('fieldName') || 'defaultFieldName',
    //     alias: this.getAttribute('alias') || 'defaultAlias',
    //     capitalizeFirstLetter: (str) => str.charAt(0).toUpperCase() + str.slice(1),
    //     required: this.getAttribute('required') || false,
    //     type: this.getAttribute('type') || 'text',
    // };

    // const evaluatedTemplate = evaluateTemplate(inputTemplate, defaultContext);

    // this.querySelector('input').setAttribute('type', defaultContext.type);
    // if(defaultContext.required) {
        // this.querySelector('input').setAttribute('required', true);
    // }

    moveLabel.bind(this)();

    // // Set listeners on all inputs for the label to float
 


    // console.log("evaluatedTemplate", evaluatedTemplate);
    // console.log({ styles })

}, inputTemplate, styles);

createCustomElement('textarea-component', function () {
    moveLabel.bind(this)();


}, textareaTemplate, styles);


function moveLabel(){
    this.querySelectorAll('input, textarea').forEach((el) => {
        el.addEventListener('focus', (e) => {
            const target = e.target;
            target.closest('label').classList.add('moveLabel');
            target.closest('label').querySelector('[part]').setAttribute('part', 'labelText moveLabel');
        })
        el.addEventListener('blur', (e) => {
            const target = e.target;
            if (target.value === '') {
                target.closest('label').classList.remove('moveLabel')
                target.closest('label').querySelector('[part]').setAttribute('part', 'labelText');
            }
        })
        el.addEventListener('change', (e) => {
            const target = e.target;
            if (target.value === '') {
                target.closest('label').classList.remove('moveLabel');
                target.closest('label').querySelector('[part]').setAttribute('part', 'labelText');
            } else {
                target.closest('label').classList.add('moveLabel');
                target.closest('label').querySelector('[part]').setAttribute('part', 'labelText moveLabel');
            }
        })
    })
}