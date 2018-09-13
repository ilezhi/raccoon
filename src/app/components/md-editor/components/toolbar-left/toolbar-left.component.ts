import { Component, Output, EventEmitter } from '@angular/core';
import { toolbar, eventHandle } from '../../config/toolbar';
import { EditorService }  from '../../services/editor.service';

@Component({
  selector: 'app-toolbar-left',
  templateUrl: './toolbar-left.component.html',
  styleUrls: ['./toolbar-left.component.scss']
})
export class ToolbarLeftComponent {
  @Output() prev = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() trash = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor(
    private editorService: EditorService
  ) { }

  onClick(type: string) {
    if (toolbar.hasOwnProperty(type)) {
      const item: ToolbarItem = toolbar[type];
      this.editorService.toolbarItemClick(item);
    }

    if (eventHandle.hasOwnProperty(type)) {
      this[eventHandle[type]].emit();
    }
  }
}
