import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { TopicService } from 'src/app/services/topic.service'

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  topics$: Observable<Topic[]>
  loading: boolean

  constructor(private ts: TopicService) {
    this.topics$ = this.ts.shared$.pipe(
      tap((topics: Topic[]) => {
        !topics && this.fetchTopics()
      })
    )
  }

  ngOnInit() {
  }

  fetchTopics(lastID?: number, size = 20) {
    this.loading = true
    this.ts.getShared(lastID, size)
      .subscribe(_ => {
        this.loading = false
      })
  }
}
