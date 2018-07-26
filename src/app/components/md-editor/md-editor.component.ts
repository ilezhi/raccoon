import { Component, OnInit, ViewChild } from '@angular/core';
import { PanelEditComponent } from './components/panel-edit/panel-edit.component';

@Component({
  selector: 'app-md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.scss']
})
export class MdEditorComponent implements OnInit {
  text = 'abc';

  constructor() { }

  ngOnInit() {
  }

  onInsert(text) {
    
  }
}
