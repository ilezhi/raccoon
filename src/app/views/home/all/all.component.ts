import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { TopicService } from 'src/app/services/topic.service'
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-all',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  topics$: Observable<Topic[]>
  loading: boolean

  constructor(
    private ts: TopicService,
    private router: Router
  ) {
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

  onEdit() {
    this.router.navigate(['', {outlets: {slide: 'topic/edit/14'}}])
  }

  onSetTop() {
  }

  onSetAwesome() {
  }

  onTrash() {
  }
}
