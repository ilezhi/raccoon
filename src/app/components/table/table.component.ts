import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: Array<Topic>

  @Output() edit = new EventEmitter<any>()
  @Output() setTop = new EventEmitter<any>()
  @Output() setAwesome = new EventEmitter<any>()
  @Output() trash = new EventEmitter<any>()

  constructor() {}

  onEdit() {
    this.edit.emit()
  }

  onSetTop() {
    this.setTop.emit()
  }

  onSetAwesome() {
    this.setAwesome.emit()
  }

  onTrash() {
    this.trash.emit()
  }
}
