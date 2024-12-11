export async function createCustomElement(name, onload, html, css, options ={}) {
    // create an HTML template element
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            ${css}
        </style>
        ${html}
    `;

    class customElementType extends HTMLElement {
        constructor() {
            super();
            if (this.innerHTML) {

                this.innerHTML = template.content.cloneNode(true).outerHTML;
            }
        }

        connectedCallback() {
            if(options.afterDomLoaded){
                onload.bind(this)
            }
            else {
                document.addEventListener('DOMContentLoaded', onload.bind(this));
            }
            this.updateTemplate();
        }



        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.updateTemplate();
            }
        }

        static get observedAttributes() {
            return [
                'fieldName', 'alias', 'required', 'type', 'multiple', 'accept', 'labelClass', 'redirect', 
                'loginImage', 'signupImage', 'description', 'width', 'slotLinks', 'placeholder', 'test', 
                'mailing-address', 'wa-state-business-license-ubi-number', 'website-social-media', 'medium', 
                'email', 'artistMentor', 'digitalImage1', 'digitalImage2', 'digitalImage4', 'hasBeenReviewed', 
                'phone', 'digitalImage3', 'firstName', 'studio-address', 'lastName', 'artistStatement', 
                'isWithinBoundaries'
            ];
        }

        updateTemplate() {
            const context = {
                fieldName: this.getAttribute('fieldName') || 'defaultFieldName',
                alias: this.getAttribute('alias') || '',
                required: this.hasAttribute('required') || false,
                capitalizeFirstLetter: (str) => str.charAt(0).toUpperCase() + str.slice(1),
                type: this.getAttribute('type') || 'text',
                multiple: this.hasAttribute('multiple') || false,
                accept: this.getAttribute('accept') || '',
                labelClass: this.getAttribute('labelClass') || '',
                redirect: this.getAttribute('redirect') || '',
                loginImage: this.getAttribute('loginImage') || '',
                signupImage: this.getAttribute('signupImage') || '',
                description: this.getAttribute('description') || '',
                width: this.getAttribute('width') || '',
                slotLinks: this.getAttribute('slotLinks') || '',
                placeholder: this.getAttribute('placeholder') || '',
                test: this.getAttribute('test') || '',
                disabled: this.hasAttribute('disabled') || false,
                value: this.getAttribute('value') || '',
                checked: this.hasAttribute('checked') || false,

                firstName: this.getAttribute('firstName') || '',
                lastName: this.getAttribute('lastName') || '',
                email: this.getAttribute('email') || '',
                waStateBusinessLicenseUbiNumber: this.getAttribute('wa-state-business-license-ubi-number') || '',
                websiteSocialMedia: this.getAttribute('website-social-media') || '',
                medium: this.getAttribute('medium') || '',
                artistMentor: this.getAttribute('artistMentor') || '',
                digitalImage1: this.getAttribute('digitalImage1') || '',
                digitalImage2: this.getAttribute('digitalImage2') || '',
                digitalImage4: this.getAttribute('digitalImage4') || '',
                hasBeenReviewed: this.getAttribute('hasBeenReviewed') || '',
                phone: this.getAttribute('phone') || '',
                digitalImage3: this.getAttribute('digitalImage3') || '',
                mailingAddress: this.getAttribute('mailing-address') || '',
                studioAddress: this.getAttribute('studio-address') || '',
                artistStatement: this.getAttribute('artistStatement') || '',
                isWithinBoundaries: this.getAttribute('isWithinBoundaries') || '',
                createdAt: this.getAttribute('createdAt') || '',
                // paypalClientId: this.getAttribute('PAYPAL_CLIENT_ID') || '',
            };


            const evaluatedTemplate = evaluateTemplate(html, context);
            this.innerHTML = `
                <style>
                ${css}
                </style>
                ${evaluatedTemplate}
                `;
        }
    }

    customElements.define(name, customElementType);
}


export // Function to evaluate template literals
    function evaluateTemplate(template, context) {
    // console.log({ template, context });
    return new Function(...Object.keys(context), `return \`${template}\`;`)(...Object.values(context));
}