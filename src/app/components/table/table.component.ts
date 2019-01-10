import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core'

@Component({
  selector: 'app-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() data: Array<Topic>
  @Input() user: User
  @Input() loading: boolean

  @Output() edit = new EventEmitter<number>()
  @Output() setTop = new EventEmitter<number>()
  @Output() setAwesome = new EventEmitter<number>()
  @Output() trash = new EventEmitter<number>()
  @Output() load = new EventEmitter<void>()

  constructor() {}

  onEdit(id: number) {
    this.edit.emit(id)
  }

  onSetTop(id: number) {
    this.setTop.emit(id)
  }

  onSetAwesome(id: number) {
    this.setAwesome.emit(id)
  }

  onTrash(id: number) {
    this.trash.emit(id)
  }

  loadMore() {
    this.load.emit()
  }
}
