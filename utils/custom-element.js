export async function createCustomElement(name, onload, html, css) {
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
            if(this.innerHTML){

                this.innerHTML = template.content.cloneNode(true).outerHTML;
            }
        }

        connectedCallback() {
            document.addEventListener('DOMContentLoaded', onload.bind(this));
            this.updateTemplate();
        }

        static get observedAttributes() {
            return ['fieldName', 'alias']; // Add all attributes you want to observe
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.updateTemplate();
            }
        }

        updateTemplate() {
            const context = {
                fieldName: this.getAttribute('fieldName') || 'defaultFieldName',
                alias: this.getAttribute('alias') || 'defaultAlias',
                required: this.hasAttribute('required') || false,
                capitalizeFirstLetter: (str) => str.charAt(0).toUpperCase() + str.slice(1),
                type: this.getAttribute('type') || 'text',
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