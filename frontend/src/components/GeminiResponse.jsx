import React from "react";
import MarkdownIt from "markdown-it";
import mk from "markdown-it-katex";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import {useCode} from "../contexts/CodeContext.jsx";
import {hasLanguageByName} from "../constants/languages.js";

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(str, {language: lang}).value;
        return `
          <div class="flex flex-col rounded-lg overflow-hidden border border-gray-700">
            <nav class="flex justify-between items-center bg-gray-800 border-b border-gray-700">
              <span class="text-xs px-3 py-2 text-gray-100 font-medium uppercase">${lang}</span>
              <div class="flex items-center justify-center h-full">
                <div 
                   onclick="handleCopy(this)"
                   class="w-8 h-8 flex justify-center items-center hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                   <i class="fa-regular fa-copy text-gray-400 hover:text-gray-200"></i>
                </div>
                <div 
                  onclick="handleMoveToEditor(this)"
                  class="w-8 h-8 flex justify-center items-center hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                  <i class="fa-solid fa-repeat text-gray-400 hover:text-gray-200"></i>
                </div>
              </div>
            </nav>
            <pre class="m-0 bg-gray-900 code-block-container"><code class="hljs language-${lang} bg-transparent">${highlighted}</code></pre>
          </div>
        `;
      } catch (error) {
        console.error('Highlight.js error:', error);
        return str;
      }
    }
    return '';
  }
}).use(mk);

const GeminiResponse = ({text}) => {
  const { updateCode, updateLanguage } = useCode();
  window.handleMoveToEditor = (button) => {
    const codeBlock = button.closest('nav').parentElement.querySelector('pre.code-block-container code');
    const codeText = codeBlock.textContent;
    const language = button.closest("nav").querySelector("span").textContent
    if (hasLanguageByName(language)) {
      updateLanguage(language);
      updateCode(codeText);
        button.querySelector('i').classList.remove('fa-regular', 'fa-repeat');
        button.querySelector('i').classList.add('fa-solid', 'fa-check');
        setTimeout(() => {
            button.querySelector('i').classList.remove('fa-solid', 'fa-check');
            button.querySelector('i').classList.add('fa-regular', 'fa-repeat');
        }, 2000);
    } else {
        console.error(`Language ${language} is not supported.`);
    }
  }
  window.handleCopy = (button) => {
    // console.log(button.closest("nav").parentElement.querySelector("span").textContent);
    const codeBlock = button.closest('nav').parentElement.querySelector('pre.code-block-container code');
    const codeText = codeBlock.textContent;
    navigator.clipboard.writeText(codeText).then(() => {
      button.querySelector('i').classList.remove('fa-regular', 'fa-copy');
      button.querySelector('i').classList.add('fa-solid', 'fa-check');
      setTimeout(() => {
        button.querySelector('i').classList.remove('fa-solid', 'fa-check');
        button.querySelector('i').classList.add('fa-regular', 'fa-copy');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  return (
    <div className="w-full self-start bg-transparent text-[var(--color-text-primary)] mb-3 gemini-response"
         dangerouslySetInnerHTML={{__html: md.render(text)}}>
    </div>
  );
};

export default GeminiResponse;