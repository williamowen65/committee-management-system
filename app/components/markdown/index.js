import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import marked from 'marked';
import markdownTemplate from './index.html.txt';

createCustomElement('markdown-component', function () {
    // convert the inner markdown to html
    const markdown = this.innerHTML;
    const html = marked(markdown);
    this.innerHTML = html
    console.log({html})
}, markdownTemplate, "");
