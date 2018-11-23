import { Component } from '@angular/core'
import { Observable, EMPTY as empty } from 'rxjs'
import { switchMap, tap } from 'rxjs/operators'
import { ActivatedRoute, ParamMap } from '@angular/router'

import { TopicService } from 'src/app/services/topic.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  topics$: Observable<Topic[]>
  user$: Observable<User>
  loading: boolean

  constructor(
    private route: ActivatedRoute,
    private ts: TopicService,
    private us: UserService
  ) {
    this.topics$ = route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const name = params.get('name')

        return us.tag$(name)
      }),
      switchMap((t: Tag) => {
        if (!t) {
          return empty
        }

        return ts.tag$(t.id).pipe(
          tap((topics: Topic[]) => {
            !topics && this.fetchTopics(t.id)
          })
        )
      })
    )

    this.user$ = us.user$
  }

  fetchTopics(id: number, lastID?: number, size = 20) {
    this.loading = true
    this.ts.getByTag(id, lastID, size)
      .subscribe(_ => {
        this.loading = false
      })
  }
}
