import { Pipe, PipeTransform } from '@angular/core';
import markdown from 'markdown-it';

const option = {
  html: true,        // Enable HTML tags in source
  xhtmlOut: true,        // Use '/' to close single tags (<br />).
  breaks: true,        // Convert '\n' in paragraphs into <br>
  langPrefix: 'lang-',  // CSS language prefix for fenced blocks. Can be
  linkify: false,        // 自动识别url
  typographer: true,
  quotes: '“”‘’'
};
const MD = markdown(option);

MD.renderer.rules.fence = function (tokens, idx) {
  const token    = tokens[idx];
  const language = token.info && ('language-' + token.info) || '';
  
  // 代码块有内容, 则高亮代码.
  if (token.content) {
    setTimeout(() => {
      prettyPrint();
    }, 0);
  }

  return '<pre class="prettyprint ' + language + ' linenums">'
    + '<code>' + token.content + '</code>'
    + '</pre>';
};

@Pipe({name: 'parseMD'})
export class ParseMD implements PipeTransform {
  transform(value: string) {
    if (!value) {
      return value;
    }
    return MD.render(value);
  }
}
