import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { PanelEditComponent } from './components/panel-edit/panel-edit.component';
import { EditorService } from './services/editor.service';

@Component({
  selector: 'app-md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.scss'],
  animations: [
    trigger('state', [
      state('edit', style({
        width: '0%'
      })),
      state('preview', style({
        width: '50%'
      })),
      transition('preview <=> edit', animate('300ms ease-in'))
    ])
  ]
})
export class MdEditorComponent implements OnInit {
  text = 'abc';
  fullscreen = false;
  viewState = 'preview';

  constructor(
    private editorService: EditorService
  ) { }

  ngOnInit() {
    const { toggleFullscreen } = this;
    // 订阅全屏切换
    this.editorService.fullscreen$
      .subscribe(toggleFullscreen.bind(this))
    
    // 订阅预览切换
    this.editorService.preview$
      .subscribe(state => this.viewState = state);
  }

  toggleFullscreen(isFull: boolean) {
    this.fullscreen = isFull;
  }
}
