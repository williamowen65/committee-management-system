import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import {marked} from 'marked';
import markdownTemplate from './index.html.txt';
import './style.scss';
const logIf = require("../../../utils/logIf.js");

createCustomElement('markdown-component', function () {
    // convert the inner markdown to html
    const markdown  = this.querySelector('span[slot="markdown-content"]').innerHTML
    logIf.component && console.log({marked, markdown, this: this})
    // const html = marked(markdown);
    const html = marked.parse(`${trimString(markdown)}`);
    this.innerHTML =   html
}, markdownTemplate, "");


function trimString(a){
    return a.split('\n')
            .map(line => line.trim() + "   ")
            .filter(line => Boolean(line))
            .join('\n   ')
  }