import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, ObservableLike } from 'rxjs'
import { tap } from 'rxjs/operators'

import { TopicService } from 'src/app/services/topic.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-all',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  topics$: Observable<Topic[]>
  user$: Observable<User>
  loading: boolean

  constructor(
    private ts: TopicService,
    private router: Router,
    private us: UserService
  ) {
    this.topics$ = this.ts.all$.pipe(
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
    this.ts.getAll(lastID, size)
      .subscribe(_ => {
        this.loading = false
      })
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
}
