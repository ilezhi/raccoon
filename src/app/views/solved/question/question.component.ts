import { Component, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'

import { TopicService } from 'src/app/services/topic.service'
import { UserService } from 'src/app/services/user.service'
import { TopicList } from 'src/app/tools/common'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent extends TopicList {
  constructor(
    ts: TopicService,
    router: Router,
    us: UserService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(ts, router, us, changeDetectorRef, ts.question$)
  }

  fetchTopics(lastID?: number, size = 20) {
    this.loading = true
    this.ts.getQuestion(lastID, size)
      .subscribe(_ => {
        this.loading = false
      })
  }
}
