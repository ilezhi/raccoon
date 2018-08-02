import { Component, OnInit, Input } from '@angular/core';


import { EditorService } from '../../services/editor.service';
import { throttleTime } from 'rxjs/operators';



@Component({
  selector: 'app-panel-view',
  templateUrl: './panel-view.component.html',
  styleUrls: ['./panel-view.component.scss']
})
export class PanelViewComponent implements OnInit {
  data: string;
  @Input() isParse: boolean;

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
    this.data = data.value;
  }
}
