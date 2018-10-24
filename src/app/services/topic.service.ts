import { Injectable } from '@angular/core'
import { Observable, of, Subject, from } from 'rxjs'

import { Store } from '@ngrx/store'
import { normalize } from 'normalizr'

import { topicSchema } from 'src/app/normalizr/schema'

import { HttpService } from './http.service'
import { Topic } from 'src/app/models'
import { catchError, map } from 'rxjs/operators'
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

    return this.http.get(url, params).pipe(
      map((res: Res) => res.data)
    )
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
    return this.http.get(url).pipe(
      map((res: Res) => res.data)
    )
  }

  close() {
    this.editor.next(true)
  }
  
  comments(topicID: number): Observable<Array<Comment>> {
    const url = `comments/${topicID}`
    return this.http.get(url).pipe(
      map((res: Res) => res.data),
      catchError(_ => from([]))
    )
  }

  /**
   * 提交评论
   * @param id topic id
   * @param content comment
   */
  postComment(id: number, content: string): Observable<any> {
    const { http, store } = this
    const url = `comment/${id}`
    return http.post(url, {content}).pipe(
      map((res: Res) => {
        store.dispatch(new TopicAction.PostComtSuccess(res.data))
        return true
      }),
      catchError(_ => of(false))
    )
  }

  /**
   * 收藏, 取消收藏
   * @param topicID
   * @param categoryID 
   */
  favor(topicID: number, categoryID: number): Observable<boolean> {
    const { http, store } = this
    const url = `topic/favor/${topicID}`
    return http.post(url, { categoryID }).pipe(
      map((res: Res) => {
        const favor = !!res.data
        const params = {
          topicID,
          categoryID,
          favor
        }
        store.dispatch(new TopicAction.FavorSuccess(params))
        return favor
      }),
      catchError(_ => of(false))
    )
  }
}
