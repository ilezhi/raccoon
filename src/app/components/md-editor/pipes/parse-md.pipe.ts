import { Pipe, PipeTransform } from '@angular/core'
import markdown from 'markdown-it'
import emoji from 'markdown-it-emoji'
import ins from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import hljs from 'highlight.js'

const option = {
  html: true,        // Enable HTML tags in source
  xhtmlOut: true,        // Use '/' to close single tags (<br />).
  breaks: true,        // Convert '\n' in paragraphs into <br>
  langPrefix: 'lang-',  // CSS language prefix for fenced blocks. Can be
  linkify: false,        // 自动识别url
  typographer: true,
  quotes: '“”‘’',
};
const MD = markdown(option)
            .use(emoji)
            .use(ins)
            .use(mark)

MD.renderer.rules.fence = function (tokens, idx) {
  const token    = tokens[idx]
  let lan = token.info || ''
  let prettyHTML = token.content

  if (lan && hljs.getLanguage(lan)) {
    try {
      prettyHTML = hljs.highlight(lan, token.content, true).value
    } catch (err) {}
    lan = 'language-' + lan
  }

  return '<div class="highlight"><pre class="' + lan + '">'
    + prettyHTML + '</pre></div>'
};

@Pipe({name: 'parseMD'})
export class ParseMD implements PipeTransform {
  transform(value: string, isParse: boolean = true) {
    if (!value) {
      return value;
    }

    if (!isParse) {
      return ''
    }

    return MD.render(value)
  }
}
