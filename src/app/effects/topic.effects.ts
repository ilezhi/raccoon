import { Inject, Injectable, InjectionToken, Optional } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable, asyncScheduler, EMPTY as empty, of } from 'rxjs'
import {
  debounceTime, map, switchMap, catchError, tap,
} from 'rxjs/operators'

import { Topic } from '../models'
import { TopicTypes } from 'src/app/action/type'
import * as TopicAction from 'src/app/action/topic.action'
import { TopicService } from '../services/topic.service'

@Injectable()
export class TopicEffects {
  @Effect()
  topics$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<TopicAction.Topics>(TopicTypes.Topics),
      map(action => {
        // 缓存判断
        let type = 'all'
        let cache = false
        console.log(type)
        if (action.payload) {
          return { type, cache }
        }

        


      }),
      switchMap(payload => {
        const { type } = payload
        // 首先验证是否需要
        return empty
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
