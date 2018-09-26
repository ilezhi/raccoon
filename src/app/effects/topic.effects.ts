import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { normalize } from 'normalizr'

import { TopicTypes } from 'src/app/action/type'
import * as TopicAction from 'src/app/action/topic.action'
import { TopicService } from '../services/topic.service'

import { topicsSchema } from 'src/app/normalizr/schema'

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

  constructor(
    private store: Store<any>,
    private action$: Actions,
    private topicService: TopicService
  ) {}
}
