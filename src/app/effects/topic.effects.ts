import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'
import { normalize } from 'normalizr'

import { TopicTypes } from 'src/app/action/type'
import * as TopicAction from 'src/app/action/topic.action'
import { TopicService } from '../services/topic.service'

import { topicsSchema, topicSchema, commentsSchema } from 'src/app/normalizr/schema'

@Injectable()
export class TopicEffects {
  @Effect()
  topics$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<TopicAction.Topics>(TopicTypes.Topics),
      map(action => action.payload),
      switchMap((payload: any) => {
        const { type, lastID, Action } = payload

        // 请求数据
        return this.topicService.topics(type, lastID)
          .pipe(
            map(data => {
              let result = normalize(data, topicsSchema)
              return new Action(result)
            }),
            catchError(err => {
              console.log(err)
              return of(new TopicAction.TopicsFailure(err))
            })
          )
      })
    )

  // @Effect()
  // post$ = this.action$.pipe(
  //   ofType<TopicAction.Post>(TopicTypes.Post),
  //   map(action => action.payload),
  //   switchMap((payload: TopicParams) => {
  //     return this.topicService.post(payload).pipe(
  //       map((topic: Topic) => new TopicAction.PostSuccess(topic)),
  //       catchError(err => of(new TopicAction.PostFailure(err)))
  //     )
  //   })
  // )

  @Effect()
  detail$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<TopicAction.Detail>(TopicTypes.Detail),
      map(action => action.payload),
      switchMap((id: number) => {
        return this.topicService.detail(id).pipe(
          map((topic: Topic) => {
            const result = normalize(topic, topicSchema)
            return new TopicAction.DetailSuccess(result)
          })
        )
      })
    )

  @Effect()
  comments$ = ():Observable<Action> =>
    this.action$.pipe(
      ofType<TopicAction.Comments>(TopicTypes.Comments),
      map(action => action.payload),
      switchMap((id: number) => {
        return this.topicService.comments(id).pipe(
          map(data => {
            const result = normalize(data, commentsSchema)
            return new TopicAction.CommentsSuccess(result)
          })
        )
      })
    )

  constructor(
    private action$: Actions,
    private topicService: TopicService
  ) {}
}
