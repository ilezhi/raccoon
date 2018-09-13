import { Injectable } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'

import { Store } from '@ngrx/store'

import { Response } from 'src/app/types/global.type'
import { HttpService } from './http.service'
import { Topic } from 'src/app/models'
import { catchError, tap, map } from 'rxjs/operators'
import { AddTopicAction, CreateTopic } from 'src/app/action/entity.action'
import * as TopicAction from 'src/app/action/topic.action'
import { TopicParams } from 'src/app/types/api.params.type'

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

  post(params: TopicParams): Observable<boolean> {
    const url = 'topic/create'
    const { store, http } = this
    return http.post(url, params)
      .pipe(
        map((res: Response) => {
          const { data } = res
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
