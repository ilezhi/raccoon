import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Store } from '@ngrx/store';

import { filter } from 'src/app/reducers'
import { Topics } from '../../action/topic.action';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  size = 50
  start: number
  end: number
  total: number

  @Output() filter = new EventEmitter<number>()
  constructor(
    private store: Store<any>
  ) {
    store.select(filter)
      .subscribe(data => {
        let start, end, total
        if (!data) {
          start = 0
          end = 0
          total = 0
        } else {
          let { page, size, total: t } = data
          const count = page * size
          start = count - size + 1
          end = t > count ? count : t
          total = t
        }

        this.start = start
        this.end = end
        this.total = total
      })
  }

  ngOnInit() {
  }

  /**
   * 分页
   * @param page prev: 上一页; next: 下一页 
   */
  onPage(page: string) {
    this.store.dispatch(new Topics(page))
  }

  onDateFilter(ev) {
    this.filter.emit(ev.target.dataset.date)
  }
}
