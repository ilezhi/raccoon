import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core'
import { debounceTime } from 'rxjs/operators'

import { EditorService } from './services/editor.service'
import { slidePanel } from './animations/slide-panel'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.scss'],
  animations: slidePanel
})
export class MdEditorComponent implements OnInit, OnDestroy {
  fullscreen = false
  preview = 'preview'
  history: string[] = []
  cursor = -1 // 游标
  isParse = true // 是否解析markdown语法
  thin = false
  sub: Subscription
  
  _content: string

  @Input()
  set simple(isSimple: boolean) {
    this.thin = isSimple
    if (isSimple) {
      this.preview = 'edit'
      this.isParse = false
    }
  }
  get simple() {
    return this.thin
  }

  @Input()
  set content(val) {
    if (val) {
      this._content = val
      this.history.push(val)
      this.cursor = 0
    }
  }

  @Output() save = new EventEmitter<string>()

  constructor(
    private editorService: EditorService
  ) { }

  ngOnInit() {
    this.subscribe()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  subscribe() {
    const {
      editorService,
      toggleFullscreen$,
      toggleLayout$,
      recordHistory$
    } = this
    // 订阅全屏切换
    this.sub = editorService.fullscreen$
      .subscribe(toggleFullscreen$.bind(this))

    // 订阅预览切换
    const s2 = editorService.layout$
      .subscribe(toggleLayout$.bind(this))
      
    // 订阅数据变化, 记录历史版本
    const s3 = editorService.data$
      .pipe(
        debounceTime(1000)
      )
      .subscribe(recordHistory$.bind(this))

    this.sub.add(s2)
    this.sub.add(s3)
  }

  toggleFullscreen$(isFull: boolean) {
    this.fullscreen = isFull
  }

  toggleLayout$(layout: Layout) {
    const { panel, preview } = layout

    let state = 'preview'
    if (panel) {
      // 单栏
      state = preview ? 'full' : 'edit'
    } else {
      state = preview ? 'preview' : 'edit'
    }

    this.isParse = (state !== 'edit')
    this.preview = state
  }

  recordHistory$(data) {
    let { value, record } = data

    // 由上一步, 下一步导致的数据变动, 不记录
    if (typeof record === 'boolean' && record === false) {
      return
    }

    let { cursor, history } = this

    let len = history.length
    cursor += 1
    if (cursor < len) {
      history = history.slice(0, cursor)
    }

    history.push(value)
    this.cursor = cursor
    this.history = history
  }

  /**
   * 上一步
   */
  onPrev() {
    let { cursor, history, editorService } = this

    if (cursor < 0) {
      return
    }

    cursor -= 1

    let text = history[cursor] || ''
    this.cursor = cursor
    editorService.updateText(text, false)
  }

  /**
   * 下一步
   */
  onNext() {
    let { cursor, history, editorService } = this

    if (cursor === (history.length - 1)) {
      return
    }

    cursor += 1

    let text = history[cursor]
    this.cursor = cursor
    editorService.updateText(text, false)
  }

  /**
   * 删除
   */
  onTrash() {
    let {cursor, history, editorService } = this

    let text = history[cursor]
    if (text === '') {
      return
    }

    text = ''
    editorService.updateText(text, true)
  }

  /**
   * 保存
   */
  onSave() {
    const text = this.history[this.cursor]
    this.save.emit(text)
  }
}
