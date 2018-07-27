import { Component, OnInit, ViewChild } from '@angular/core';

import { EditorService } from './services/editor.service';
import { slidePanel } from './animations/slide-panel';
@Component({
  selector: 'app-md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.scss'],
  animations: slidePanel
})
export class MdEditorComponent implements OnInit {
  text = 'abc';
  fullscreen = false;
  preview = 'preview';

  constructor(
    private editorService: EditorService
  ) { }

  ngOnInit() {
    const { toggleFullscreen$, toggleLayout$ } = this;
    // 订阅全屏切换
    this.editorService.fullscreen$
      .subscribe(toggleFullscreen$.bind(this))
    
    // 订阅预览切换
    this.editorService.layout$
      .subscribe(toggleLayout$.bind(this));
  }

  toggleFullscreen$(isFull: boolean) {
    this.fullscreen = isFull;
  }

  toggleLayout$(layout: Layout) {
    const { panel, preview } = layout;

    let state = 'preview';
    if (panel) {
      // 单栏
      state = preview ? 'full' : 'edit';
    } else {
      state = preview ? 'preview' : 'edit';
    }

    this.preview = state;
  }
}
