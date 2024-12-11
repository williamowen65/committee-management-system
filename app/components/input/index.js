import inputTemplate from './types/text-input.html.txt';
import fileInputTemplate from './types/file-input.html.txt';
import textareaTemplate from './types/textarea-input.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import styles from './style.scss.txt';



createCustomElement('input-component', function () {
    console.log('input-component loaded');
    // set slot

    moveLabel.bind(this)();


}, inputTemplate, styles);

createCustomElement('textarea-component', function () {
    moveLabel.bind(this)();
}, textareaTemplate, styles);


createCustomElement('file-input-component', function () {
    const imagesContainer = this.querySelector('.images-container');
    const parentContainer = imagesContainer.closest('.file-input-component')
    const labelContainer = parentContainer.querySelector('.label-container');

    this.setImage = function (src, file) {
        // empty out the images container
        const inputLabelText = imagesContainer.querySelector('.ifEmpty').outerHTML;
        imagesContainer.innerHTML = inputLabelText;
        const fileNameEl = parentContainer.querySelector('.file-name')
        if (fileNameEl) {
            fileNameEl.remove();
        }


        const img = document.createElement('img');
        const deleteButton = document.createElement('button');
        const alertButton = document.createElement('i');
        alertButton.classList.add('fas', 'fa-exclamation-triangle', 'alert-icon');


        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', (e) => {
            img.remove();
            deleteButton.remove();
            imagesContainer.classList.remove('has-images');
            parentContainer.querySelector('.file-name').remove();
            parentContainer.querySelectorAll('.error').forEach(error => error.remove());
            // remove button from file input
            const fileInput = parentContainer.querySelector('input');
            fileInput.value = '';
            // empty .img-container
            imagesContainer.innerHTML = inputLabelText;

            // guarantee that the file input is required
            fileInput.setAttribute('required', 'required');

          
            // prevent bubbling event on delete image button
            e.stopPropagation();
            e.stopImmediatePropagation();
        });

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        imgContainer.appendChild(img);
        labelContainer.appendChild(deleteButton);

        labelContainer.appendChild(alertButton);

        imagesContainer.appendChild(imgContainer);
        imagesContainer.classList.add('has-images');

        img.src = src;

        // display the name of the file
        const fileName = document.createElement('p');
        fileName.textContent = file.name;
        fileName.classList.add('file-name');
        parentContainer.appendChild(fileName);

        return this;
    }


    this.querySelector('input').addEventListener('click', (e) => {

        // prevent bubbling event on delete image button
        if (e.target.classList.contains('delete-button')) {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    })


    // Set listeners to display images added to file input
    this.querySelector('input').addEventListener('change', (e) => {



        Array.from(e.target.files).forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {

                this.setImage(reader.result, file)

                this.querySelector(".file-input-component").setAttribute('hasError', false);

                // Display possible errors with this file
                // Requirements: Size must be no larger than 3 mb. 
                // Must not be a thumbnail image.
                // One image must be a square

                console.log("file size check ", { fileSize: file.size, fileName: file.name, fileType: file.type });

                // Check if the file is a thumbnail image by checking the size (size must be greater than 20kB )
                if (file.size < 1000000) {
                    const error = document.createElement('p');
                    error.textContent = 'This image is too small. Please upload a 2-3MB image.';
                    error.classList.add('error');
                    parentContainer.appendChild(error);
                    this.querySelector(".file-input-component").setAttribute('hasError', true);

                }
                // make sure the image isn't too big
                if (file.size > 3000000) { // 3 MB
                    const error = document.createElement('p');
                    error.textContent = 'File is too large. Please upload an image less than 3 mb.';
                    error.classList.add('error');
                    parentContainer.appendChild(error);
                    this.querySelector(".file-input-component").setAttribute('hasError', true);
                }


                // Get attribute "square" from component
                const squareRequirement = this.getAttribute('square-requirement');
                if (squareRequirement) {


                    // check for square size
                    const image = new Image();
                    image.src = reader.result;
                    image.onload = () => {
                        const { width, height } = image;
                        console.log({ width, height });
                        if (width !== height) {
                            const error = document.createElement('p');
                            error.textContent = 'Image is not square. Please upload a square image.';
                            error.classList.add('error');
                            parentContainer.appendChild(error);
                        }
                    }
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