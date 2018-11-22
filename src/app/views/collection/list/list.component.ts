import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Observable, EMPTY as empty } from 'rxjs'
import { switchMap, tap } from 'rxjs/operators'

import { TopicService } from 'src/app/services/topic.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  topics$: Observable<Topic[]>
  user$: Observable<User>
  loading: boolean

  constructor(
    private route: ActivatedRoute,
    private ts: TopicService,
    private us: UserService
  ) { }

  ngOnInit() {
    const { route, us } = this
    this.topics$ = route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const name = params.get('name')

        return us.category$(name)
      }),
      switchMap((c: Category) => {
        if (!c) {
          return empty
        }

        return this.ts.collection$(c.id).pipe(
          tap((topics: Topic[]) => {
            !topics && this.fetchTopics(c.id)
          })
        )
      })
    )

    this.user$ = us.user$
  }

  fetchTopics(id: number, lastID?: number, size = 20) {
    this.loading = true
    this.ts.getByCollection(id, lastID, size)
      .subscribe(_ => {
        this.loading = false
      })
  }
}
