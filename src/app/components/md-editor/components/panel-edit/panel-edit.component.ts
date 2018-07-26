import { Component, Renderer2, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'app-panel-edit',
  templateUrl: './panel-edit.component.html',
  styleUrls: ['./panel-edit.component.scss']
})
export class PanelEditComponent implements OnInit  {
  data = '';

  @ViewChild('md')
  $textarea: ElementRef;

  constructor(
    private renderer2: Renderer2,
    private editorService: EditorService
  ) {}

  ngOnInit() {
    let { editorService, insertText, updateData } = this;
    editorService.toolbar$.subscribe(insertText.bind(this));
    editorService.data$.subscribe(updateData.bind(this));
  }

  // 点击工具条插入格式文本
  insertText(item) {
    const { $textarea, data } = this;
    const { selectionStart: start, selectionEnd: end } = $textarea.nativeElement;

    this.editorService.insertText({start, end}, item, data);
  }

  updateData(data) {
    let { $textarea, renderer2 } = this;
    let { value, start, end } = data;
    this.data = value;

    setTimeout(() => {
      // 获取焦点才能选中
      $textarea.nativeElement.focus();
      renderer2.setProperty($textarea.nativeElement, 'selectionStart', start);
      renderer2.setProperty($textarea.nativeElement, 'selectionEnd', end);
    }, 0);
  }
}
