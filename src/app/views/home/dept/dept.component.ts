import { Component, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'

import { TopicService } from 'src/app/services/topic.service'
import { UserService } from 'src/app/services/user.service'
import { TopicList } from 'src/app/tools/common'

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss']
})
export class DeptComponent extends TopicList {
  constructor(
    ts: TopicService,
    router: Router,
    us: UserService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(ts, router, us, changeDetectorRef, ts.dept$)
  }

  fetchTopics(lastID?: number, size = 20) {
    this.loading = true
    this.ts.getDept(lastID, size)
      .subscribe(_ => {
        this.loading = false
      }) 
  }
}
