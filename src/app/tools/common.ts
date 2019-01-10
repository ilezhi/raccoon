import { ChangeDetectorRef, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'

import { TopicService } from '../services/topic.service'
import { UserService } from '../services/user.service'

export class TopicList implements OnDestroy {
  public topics: Topic[]
  user$: Observable<User>
  loading: boolean
  done: boolean
  id: number

  sub: Subscription

  constructor(
    protected ts: TopicService,
    protected router: Router,
    protected us: UserService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected state$: Observable<PageState>
  ) {
    this.sub = state$.subscribe((state: PageState) => {
      if (!state) {
        return
      }

      const { data, done } = state
      this.topics = data
      this.done = done
      changeDetectorRef.markForCheck()
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

  fetchTopics(lastID?: number, size = 20) {}

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
