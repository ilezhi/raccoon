import { Component, OnInit, OnDestroy, Input } from '@angular/core'


import { EditorService } from '../../services/editor.service'
import { throttleTime } from 'rxjs/operators'
import { Subscription } from 'rxjs'



@Component({
  selector: 'app-panel-view',
  templateUrl: './panel-view.component.html',
  styleUrls: ['./panel-view.component.scss']
})
export class PanelViewComponent implements OnInit, OnDestroy {
  data: string
  sub: Subscription
  @Input() isParse: boolean
  @Input()
  set content(val) {
    this.data = val
  }

  constructor(
    private editorService: EditorService
  ) { }

  ngOnInit() {
    const { editorService, parseMarkdownToHTML$ } = this
    this.sub = editorService.data$
      .pipe(
        throttleTime(50)
      )
      .subscribe(parseMarkdownToHTML$.bind(this))
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  // 编辑区内容改变
  parseMarkdownToHTML$(data: any) {
    this.data = data.value
  }
}
