import { Component, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, forkJoin } from 'rxjs'

import { TopicService } from 'src/app/services/topic.service'
import { UserService } from 'src/app/services/user.service'
import { TopicList } from 'src/app/tools/common'


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent extends TopicList {
  constructor(
    ts: TopicService,
    router: Router,
    us: UserService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(ts, router, us, changeDetectorRef, ts.all$)
  }

  fetchTopics(lastID?: number, size = 20) {
    const { ts } = this
    this.loading = true
    let ob$: Observable<any> = !lastID ? forkJoin(
      ts.getAll(lastID, size),
      ts.getTop()
    ) : ts.getAll(lastID, size)

    ob$.subscribe(_ => {
      this.loading = false
    })
  }
}
