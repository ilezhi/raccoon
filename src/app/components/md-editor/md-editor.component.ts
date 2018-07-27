import { Component, OnInit, ViewChild } from '@angular/core';
import { PanelEditComponent } from './components/panel-edit/panel-edit.component';
import { EditorService } from './services/editor.service';

@Component({
  selector: 'app-md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.scss']
})
export class MdEditorComponent implements OnInit {
  text = 'abc';
  fullscreen = false;

  constructor(
    private editorService: EditorService
  ) { }

  ngOnInit() {
    const { toggleFullscreen } = this;
    this.editorService.fullscreen$
      .subscribe(toggleFullscreen.bind(this))
  }

  toggleFullscreen(isFull: boolean) {
    this.fullscreen = isFull;
  }
}
