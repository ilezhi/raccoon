import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favor-modal',
  templateUrl: './favor-modal.component.html',
  styleUrls: ['./favor-modal.component.scss']
})
export class FavorModalComponent implements OnInit {
  cid = 0
  category = ''
  editable = false
  show = false

  @Input()
  set visible(val) {
    this.show = val
    if (!val) {
      this.onHideInput()
    }
  }
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<number>()

  constructor() { }

  ngOnInit() {
  }

  /**
   * 显示新建分类
   */
  onShowInput() {
    this.editable = true
  }

  onHideInput() {
    this.editable = false
    this.category = ''
    this.cid = 0
  }

  /**
   * 新增分类
   */
  onNewCategory() {
  }

  /**
   * 取消收藏
   */
  onCancel() {
    this.cancel.emit()
  }

  onConfirm() {
    this.submit.emit(this.cid)
  }
}
