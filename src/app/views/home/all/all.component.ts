import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { TopicService } from 'src/app/services/topic.service'

@Component({
  selector: 'app-all',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  topics$: Observable<Topic[]>
  loading: boolean

  constructor(private ts: TopicService) {
    this.topics$ = this.ts.all$.pipe(
      tap((topics: Topic[]) => {
        !topics && this.fetchTopics()
      })
    )
  }

  ngOnInit() {
  }

  fetchTopics(lastID?: number, size = 20) {
    this.loading = true
    this.ts.getAll(lastID, size)
      .subscribe(_ => {
        this.loading = false
      })
  }
}
