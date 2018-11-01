import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { TopicService } from 'src/app/services/topic.service'

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  topics$: Observable<Topic[]>
  loading: boolean

  constructor(private ts: TopicService) {
    this.topics$ = this.ts.answer$.pipe(
      tap((topics: Topic[]) => {
        !topics && this.fetchTopics()
      })
    )
  }

  ngOnInit() {
  }

  fetchTopics(lastID?: number, size = 20) {
    this.loading = true
    this.ts.getAnswer(lastID, size)
      .subscribe(_ => {
        this.loading = false
      })
  }
}
