import { Component, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'

import { TopicService } from 'src/app/services/topic.service'
import { UserService } from 'src/app/services/user.service'
import { TopicList } from 'src/app/tools/common'

@Component({
  selector: 'app-awesome',
  templateUrl: './awesome.component.html',
  styleUrls: ['./awesome.component.scss']
})
export class AwesomeComponent extends TopicList {
  constructor(
    ts: TopicService,
    router: Router,
    us: UserService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(ts, router, us, changeDetectorRef, ts.awesome$)
  }

  fetchTopics(lastID?: number, size = 20) {
    this.loading = true
    this.ts.getAwesome(lastID, size)
      .subscribe(_ => {
        this.loading = false
      })
  }
}
