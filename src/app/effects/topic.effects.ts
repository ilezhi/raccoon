import { Inject, Injectable, InjectionToken, Optional } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store, select } from '@ngrx/store'
import { Observable, asyncScheduler, EMPTY as empty, of } from 'rxjs'
import {
  debounceTime, map, switchMap, catchError, tap, distinctUntilChanged, skip, last,
} from 'rxjs/operators'
import { normalize } from 'normalizr'

import { Topic } from '../models'
import { TopicTypes } from 'src/app/action/type'
import * as TopicAction from 'src/app/action/topic.action'
import { TopicService } from '../services/topic.service'
import { getRouterData, getLastID } from 'src/app/reducers'
import { getTopics } from 'src/app/reducers/entities.reducer'
import { topicsSchema } from 'src/app/normalizr/schema'

@Injectable()
export class TopicEffects {
  @Effect()
  topics$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<TopicAction.Topics>(TopicTypes.Topics),
      map(action => action.payload),
      switchMap((payload: any) => {
        const { cache, type, page = 1, lastID, Action } = payload

        // 使用缓存
        if (cache) {
          return of(new Action(page))
        }

        // 请求数据
        return this.topicService.topics(type, lastID)
          .pipe(
            map(data => {
              const { list, ...rest } = data
              let result = normalize(list, topicsSchema)
              result = {
                ...result,
                ...rest,
                page
              }
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
