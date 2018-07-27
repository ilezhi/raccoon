import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'app-toolbar-right',
  templateUrl: './toolbar-right.component.html',
  styleUrls: ['./toolbar-right.component.scss']
})
export class ToolbarRightComponent implements OnInit {
  fullscreen = false;
  viewState = 'preview';

  constructor(
    private editorService: EditorService
  ) { }

  ngOnInit() {
  }

  /**
   * 网页全屏
   */
  onToggleFullscreen() {
    let fullscreen = !this.fullscreen;
    this.fullscreen = fullscreen;
    this.editorService.toggleFullscreen(fullscreen);
  }

  /**
   * F11效果全屏
   */
  onFullscreen() {
    const $panel = document.querySelector('.md-editor .panel');
    $panel.webkitRequestFullscreen();
  }

  onTogglePreview() {
    let { viewState } = this;
    viewState = viewState === 'preview' ? 'edit' : 'preview';
    this.viewState = viewState;
    this.editorService.togglePreview(viewState);
  }
}
