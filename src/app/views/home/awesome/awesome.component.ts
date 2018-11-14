import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { TopicService } from 'src/app/services/topic.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-awesome',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './awesome.component.html',
  styleUrls: ['./awesome.component.scss']
})
export class AwesomeComponent implements OnInit {
  topics$: Observable<Topic[]>
  user$: Observable<User>
  loading: boolean

  constructor(
    private ts: TopicService,
    private us: UserService
  ) {
    this.topics$ = this.ts.awesome$.pipe(
      tap((topics: Topic[]) => {
        !topics && this.fetchTopics()
      })
    )

    this.user$ = this.us.user$
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
