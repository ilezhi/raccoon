import { Component, Renderer2, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { EditorService } from '../../services/editor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panel-edit',
  templateUrl: './panel-edit.component.html',
  styleUrls: ['./panel-edit.component.scss']
})
export class PanelEditComponent implements OnInit, OnDestroy{
  data = '';

  private sub: Subscription

  @Input()
  set content(val) {
    this.data = val
  }

  @ViewChild('md')
  $textarea: ElementRef;

  constructor(
    private renderer2: Renderer2,
    private editorService: EditorService
  ) {}

  ngOnInit() {
    const { editorService, insertText$, updateData$ } = this;
    // 订阅工具条插入文本事件
    this.sub = editorService.toolbar$.subscribe(insertText$.bind(this));
    // 订阅textarea数据更改事件
    const s2 = editorService.data$.subscribe(updateData$.bind(this));

    this.sub.add(s2)
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  // 直接输入内容时, 触发textarea更新
  onTextChange() {
    this.editorService.updateText(this.data);
  }

  // 点击工具条插入格式文本
  insertText$(item) {
    const { $textarea, data } = this;
    const { selectionStart: start, selectionEnd: end } = $textarea.nativeElement;

    this.editorService.insertText({start, end}, item, data);
  }

  // 编辑区内容改变
  updateData$(data) {
    const { value, start, end, record } = data;

    if (typeof record === 'boolean') {
      this.data = value;
      return;
    }
    // 手动输入
    if (typeof start !== 'number' || typeof end !== 'number') {
      return;
    }

    // 通过工具条插入格式片段
    this.data = value;
    const { $textarea, renderer2 } = this;

    if (start !== end) {
      setTimeout(() => {
        // 获取焦点才能选中
        renderer2.setProperty($textarea.nativeElement, 'selectionStart', start);
        renderer2.setProperty($textarea.nativeElement, 'selectionEnd', end);
      }, 0);
    }
    $textarea.nativeElement.focus();
  }

  /**
   * 回车后, 验证是否递增无序列表, 或有序列表
   */
  onPressEnter() {
    let { selectionStart: start, selectionEnd: end } = this.$textarea.nativeElement;
    const lines = this.data.trim().split(/\n/g);
    let last = lines.pop();
    let data = '';

    if (/^\d\.\s?[\s\S]*$/.test(last)) {
      // 有序列表
      if (last.trim().length === 2) {
        start -= last.length;
        last = '';
      } else {
        const num = +last[0] + 1;
        data = `${num}. `;
        start += 4;
      }
    } else if (/^\-\s?[\s\S]*$/.test(last)) {
      // 无序列表
      if (last.trim().length === 1) {
        start -= last.length;
        last = '';
      } else {
        data = '- ';
        start += 3;
      }
    } else {
      return;
    }

    end = start;

    if (last) {
      lines.push(last);
    }

    if (data) {
      lines.push(data);
    }

    this.data = lines.join('\n') + '\n';
    const { renderer2, $textarea } = this;
    setTimeout(() => {
      // 获取焦点才能选中
      renderer2.setProperty($textarea.nativeElement, 'selectionStart', start);
      renderer2.setProperty($textarea.nativeElement, 'selectionEnd', end);
    }, 0);
  }
}
