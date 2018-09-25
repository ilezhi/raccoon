import { Injectable } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'

import { Store } from '@ngrx/store'
import { normalize } from 'normalizr'

import { topicSchema } from 'src/app/normalizr/schema'

import { HttpService } from './http.service'
import { Topic } from 'src/app/models'
import { catchError, tap, map } from 'rxjs/operators'
import * as TopicAction from 'src/app/action/topic.action'

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private editor = new Subject<boolean>()

  editor$ = this.editor.asObservable()

  constructor(
    private store: Store<any>,
    private http: HttpService
  ) {}

  topics(type = 'all', lastID?: number, size = 2): Observable<any> {
    const url = `topics/${type}`
    const params = {
      lastID,
      size
    }

    return this.http.get(url, params)
      .pipe(map((res: Res) => res.data))
  }

  post(params: TopicParams): Observable<boolean> {
    const url = 'topic/create'
    const { store, http } = this
    return http.post(url, params)
      .pipe(
        map((res: Res) => {
          const data = normalize(res.data, topicSchema)
          store.dispatch(new TopicAction.PostSuccess(data))
          return true
        }),
        catchError(err => {
          store.dispatch(new TopicAction.PostFailure(err))
          return of(false)
        })
      )
  }

  close() {
    this.editor.next(true)
  }
}
