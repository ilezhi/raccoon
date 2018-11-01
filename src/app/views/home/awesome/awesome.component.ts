import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { TopicService } from 'src/app/services/topic.service'

@Component({
  selector: 'app-awesome',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './awesome.component.html',
  styleUrls: ['./awesome.component.scss']
})
export class AwesomeComponent implements OnInit {
  topics$: Observable<Topic[]>
  loading: boolean

  constructor(private ts: TopicService) {
    this.topics$ = this.ts.awesome$.pipe(
      tap((topics: Topic[]) => {
        !topics && this.fetchTopics()
      })
    )
  }

  ngOnInit() {
  }

  fetchTopics(lastID?: number, size = 20) {
    this.loading = true
    this.ts.getAwesome(lastID, size)
      .subscribe(_ => {
        this.loading = false
      })
  }
}
