export async function createCustomElement(name, onload, html, css, options = {
    attributes: [],
}) {
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
            // console.log('connectedCallback');
            if(options.afterDomLoaded){
                onload.bind(this)
            }
            else {
                document.addEventListener('DOMContentLoaded', onload.bind(this));
            }
            this.updateTemplate();
        }

        // You can call this if rendering the element after the DOM has loaded
        init(){
            onload.bind(this)();
            this.updateTemplate();
        }

        
        updateTemplate() {
                // The random Id is to avoid conflicts with other instances of the same component
            // in the same page (if you use the id attribute in a component.)
            const randomId = Math.floor(Math.random() * 1000000);

            
            // Get all the attributes of the custom element and pass them to the template
            const context = {
                // set default values of "" (empty string) for all attributes
                ...options.attributes.reduce((acc, attr) => {
                    acc[attr] = this.getAttribute(attr) || '';
                    return acc;
                }, {}),
                randomId
            };

            const evaluatedTemplate = evaluateTemplate(html, context, name);
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