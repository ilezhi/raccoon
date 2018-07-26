import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { toolbar }        from '../../config/toolbar';
import { EditorService }  from '../../services/editor.service';

@Component({
  selector: 'app-toolbar-left',
  templateUrl: './toolbar-left.component.html',
  styleUrls: ['./toolbar-left.component.scss']
})
export class ToolbarLeftComponent implements OnInit {
  @Output() toolbarClick = new EventEmitter<ToolbarItem>();

  constructor(
    private editorService: EditorService
  ) { }

  ngOnInit() {
  }

  onClick(type: string) {
    if (toolbar.hasOwnProperty(type)) {
      const item: ToolbarItem = toolbar[type];
      this.editorService.toolbarItemClick(item);
    }
  }
}
