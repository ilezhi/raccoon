import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'app-toolbar-right',
  templateUrl: './toolbar-right.component.html',
  styleUrls: ['./toolbar-right.component.scss']
})
export class ToolbarRightComponent implements OnInit {
  fullscreen = false;

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
}
