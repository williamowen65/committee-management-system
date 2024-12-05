import inputTemplate from './types/text-input.html.txt';
import fileInputTemplate from './types/file-input.html.txt';
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


createCustomElement('file-input-component', function () {

   

    this.querySelector('input').addEventListener('click', (e) => {
        
        // prevent bubbling event on delete image button
        if (e.target.classList.contains('delete-button')) {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    })


    // Set listeners to display images added to file input
    this.querySelector('input').addEventListener('change', (e) => {

        const imagesContainer = this.querySelector('.images-container');
        const parentContainer =  imagesContainer.closest('.file-input-component')
    
        Array.from(e.target.files).forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {

                // empty out the images container
                const inputLabelText = imagesContainer.querySelector('.ifEmpty').outerHTML;
                imagesContainer.innerHTML = inputLabelText;
                const fileNameEl = parentContainer.querySelector('.file-name')
                if(fileNameEl) {
                    fileNameEl.remove();
                }

                
                const img = document.createElement('img');
                const deleteButton = document.createElement('button');
                
                deleteButton.textContent = 'X';
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', () => {
                    img.remove();
                    deleteButton.remove();
                    imagesContainer.classList.remove('has-images');
                    parentContainer.querySelector('.file-name').remove();
                    // remove button from file input
                    const fileInput = parentContainer.querySelector('input');
                    fileInput.value = '';
                    // prevent bubbling event on delete image button
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                });

                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container');
                imgContainer.appendChild(img);
                parentContainer.appendChild(deleteButton);

                imagesContainer.appendChild(imgContainer);
                imagesContainer.classList.add('has-images');
                
                img.src = reader.result;

                // display the name of the file
                const fileName = document.createElement('p');
                fileName.textContent = file.name;
                fileName.classList.add('file-name');
                parentContainer.appendChild(fileName);


                // Display possible errors with this file
                // Requirements: Size must be no larger than 3 mb. 
                // Must not be a thumbnail image.
                // One image must be a square

                // Check if the file is a thumbnail image by checking the size (size must be greater than 20kB )
                if(file.size < 20000) {
                    const error = document.createElement('p');
                    error.textContent = 'File is a thumbnail image. Please upload a larger image.';
                    error.classList.add('error');
                    parentContainer.appendChild(error);
                }
                // make sure the image isn't too big
                if(file.size > 3000000) {
                    const error = document.createElement('p');
                    error.textContent = 'File is too large. Please upload an image less than 3 mb.';
                    error.classList.add('error');
                    parentContainer.appendChild(error);
                }


            };
            reader.readAsDataURL(file);
        });
    })


}, fileInputTemplate, styles);


function moveLabel() {
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