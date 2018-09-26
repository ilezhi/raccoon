import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Store } from '@ngrx/store';

import { getPageState, getLastID } from 'src/app/reducers'
import * as TopicAction from 'src/app/action/topic.action'
import { first } from 'rxjs/operators';
import { getPageTopics } from '../../tools/util';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  page: number
  size: number
  start: number
  end: number
  total: number
  ids: number[]
  topics: Array<Topic>

  @Output() filter = new EventEmitter<number>()
  constructor(
    private store: Store<any>
  ) {
    store.select(getPageState)
      .subscribe(data => {
        let start, end, total, page, size

        if (!data || !data.page) {
          start = 0
          end = 0
          total = 0
          page = 1
          size = 50
        } else {
          let { page: p, size: s, total: t } = data
          const count = p * s
          start = count - s + 1
          end = t > count ? count : t
          total = t
          page = p
          size = s
        }

        this.page = page
        this.start = start
        this.end = end
        this.total = total
        this.size = size
      })
  }

  ngOnInit() {
  }

  /**
   * 分页
   * @param n -1: 上一页; 1: 下一页 
   */
  onPage(n: number) {
    let { page, store } = this
    page += n

    store.select(getLastID(page))
      .pipe(first())
      .subscribe(data => {
        const { lastID, Action, type } = data
        let params = {
          lastID,
          type,
          Action,
          cache: false,
          page
        }
        if (!lastID) {
          params.cache = true
        }

        store.dispatch(new TopicAction.Topics(params))
      })
  }

  onDateFilter(ev) {
    this.filter.emit(ev.target.dataset.date)
  }
}
