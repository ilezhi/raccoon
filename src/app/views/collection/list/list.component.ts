import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Observable, EMPTY as empty, Subscription } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { TopicService } from 'src/app/services/topic.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {
  topics: Topic[]
  user$: Observable<User>
  loading: boolean
  done: boolean
  id: number
  init = true

  sub: Subscription

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ts: TopicService,
    private us: UserService
  ) {
    this.sub = route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const name = params.get('name')
        return us.category$(name)
      }),
      switchMap((c: Category) => {
        if (!c) {
          return empty
        }

        this.id = c.id
        return this.ts.collection$(c.id)
      })
    ).subscribe((state: PageState) => {
      const { data = [], done = false } = state || {}
      this.topics = data
      this.done = done

      // 收藏类之间切换时 无法主动触发loadMore
      if (!state && !this.init) {
        this.onLoadMore()
      }
    })

    this.user$ = us.user$
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  onEdit(id: number) {
    this.router.navigate(['', {outlets: {slide: `topic/edit/${id}`}}])
  }

  onSetTop(id: number) {
    this.ts.toggleTopicField(id, 'top')
      .subscribe(_ => {})
  }

  onSetAwesome(id: number) {
    this.ts.toggleTopicField(id, 'awesome')
      .subscribe(_ => {})
  }

  onTrash() {
  }

  fetchTopics(lastID?: number, size = 20) {
    const { id } = this
    this.loading = true
    this.ts.getByCollection(id, lastID, size)
      .subscribe(_ => {
        this.loading = false
        this.init = false
      })
  }

  onLoadMore() {
    const { topics, done } = this
    if (done) {
      return
    }

    let lastID
    if (topics && topics.length) {
      const len = topics.length
      lastID = topics[len - 1].activeAt
    }

    this.fetchTopics(lastID)
  }
}
