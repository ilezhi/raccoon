import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core'
import { throttleTime, debounceTime } from 'rxjs/operators'

import { EditorService } from './services/editor.service'
import { slidePanel } from './animations/slide-panel'

@Component({
  selector: 'app-md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.scss'],
  animations: slidePanel
})
export class MdEditorComponent implements OnInit {
  text = ''
  fullscreen = false
  preview = 'preview'
  history: string[] = []
  cursor = -1 // 游标
  isParse = true // 是否解析markdown语法

  @Output() save = new EventEmitter<string>()

  constructor(
    private editorService: EditorService
  ) { }

  ngOnInit() {
    this.subscribe()
  }

  subscribe() {
    const {
      editorService,
      toggleFullscreen$,
      toggleLayout$,
      recordHistory$
    } = this
    // 订阅全屏切换
    editorService.fullscreen$
      .subscribe(toggleFullscreen$.bind(this))

    // 订阅预览切换
    editorService.layout$
      .subscribe(toggleLayout$.bind(this))

    // 订阅数据变化, 记录历史版本
    editorService.data$
      .pipe(
        debounceTime(1000)
      )
      .subscribe(recordHistory$.bind(this))
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
