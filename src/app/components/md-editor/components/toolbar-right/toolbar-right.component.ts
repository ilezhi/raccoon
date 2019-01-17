import { Component, Input } from '@angular/core'
import { EditorService } from '../../services/editor.service'

@Component({
  selector: 'app-toolbar-right',
  templateUrl: './toolbar-right.component.html',
  styleUrls: ['./toolbar-right.component.scss']
})
export class ToolbarRightComponent {
  fullscreen = false
  preview = 1   // 0: 不显示预览; 1: 显示预览
  panel = 0     // 0: 双栏; 1: 单栏
  thin = false

  @Input()
  set simple(isSimple) {
    this.thin = isSimple
    if (isSimple) {
      this.preview = 0
      this.panel = 1
    }
  }
  get simple() {
    return this.thin
  }

  constructor(
    private editorService: EditorService
  ) { }

  /**
   * 网页全屏
   */
  onToggleFullscreen() {
    const fullscreen = !this.fullscreen
    this.fullscreen = fullscreen
    this.editorService.toggleFullscreen(fullscreen)
  }

  /**
   * F11效果全屏
   */
  onFullscreen() {
    const $panel: any = document.querySelector('.md-editor .panel')
    $panel.webkitRequestFullscreen()
  }

  onTogglePreview() {
    let { preview, panel } = this
    preview ^= 1
    this.preview = preview
    this.editorService.toggleLayout({panel, preview})
  }

  onTogglePanel() {
    let { preview, panel } = this
    panel ^= 1

    if (panel === 0 && preview === 0) {
      preview = 1
    }

    this.panel = panel
    this.preview = preview
    this.editorService.toggleLayout({panel, preview})
  }
}
