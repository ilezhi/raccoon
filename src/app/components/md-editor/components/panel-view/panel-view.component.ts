import { Component, OnInit } from '@angular/core';
import markdown from 'markdown-it';

import { EditorService } from '../../services/editor.service';
import { throttleTime } from 'rxjs/operators';

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

@Component({
  selector: 'app-panel-view',
  templateUrl: './panel-view.component.html',
  styleUrls: ['./panel-view.component.scss']
})
export class PanelViewComponent implements OnInit {
  data: string;

  constructor(
    private editorService: EditorService
  ) { }

  ngOnInit() {
    const { editorService, parseMarkdownToHTML$ } = this;
    editorService.data$
      .pipe(
        throttleTime(50)
      )
      .subscribe(parseMarkdownToHTML$.bind(this));
  }

  // 编辑区内容改变
  parseMarkdownToHTML$(data: any) {
    let { value } = data;
    value = MD.render(value);
    this.data = value;
  }
}
