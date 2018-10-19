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
  }

  post(params: TopicParams): Observable<boolean> {
    const url = 'topic/create'
    const { store, http } = this
    return http.post(url, params)
      .pipe(
        map(data => {
          const result = normalize(data, topicSchema)
          store.dispatch(new TopicAction.PostSuccess(result))
          return true
        }),
        catchError(err => {
          store.dispatch(new TopicAction.PostFailure(err))
          return of(false)
        })
      )
  }

  detail(id: number): Observable<Topic> {
    const url = `topic/${id}`
    return this.http.get(url)
  }

  close() {
    this.editor.next(true)
  }

  /**
   * 收藏, 取消收藏
   * @param topic id
   * @param category id 
   */
  favor(topic: number, category: number) {
    const { http, store } = this
    const url = `topic/favor/${topic}`
    return this.http.post(url, { category }).pipe(
      map((favor: boolean) => {
        const params = {
          topic,
          category,
          favor
        }
        store.dispatch(new TopicAction.FavorSuccess(params))
        return true
      }),
      catchError(_ => of(false))
    )
  }
}
