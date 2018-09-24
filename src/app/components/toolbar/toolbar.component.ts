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
  page = 1
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
        let start, end, total, page
        if (!data) {
          start = 0
          end = 0
          total = 0
          page = 1
        } else {
          let { page: p, size, total: t } = data
          const count = p * size
          start = count - size + 1
          end = t > count ? count : t
          total = t
          page = p
        }

        this.page = page
        this.start = start
        this.end = end
        this.total = total
      })
  }

  ngOnInit() {
  }

  /**
   * 分页
   * @param n -1: 上一页; 1: 下一页 
   */
  onPage(n: number) {
    let { page } = this
    page += n
    this.store.dispatch(new Topics({page}))
  }

  onDateFilter(ev) {
    this.filter.emit(ev.target.dataset.date)
  }
}
