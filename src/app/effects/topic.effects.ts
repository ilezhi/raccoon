import { Inject, Injectable, InjectionToken, Optional } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store, select } from '@ngrx/store'
import { Observable, asyncScheduler, EMPTY as empty, of } from 'rxjs'
import {
  debounceTime, map, switchMap, catchError, tap,
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
      switchMap(action => {
        // 缓存判断
        let { type, page } = action.payload
        let cache = false

        // 首次加载
        if (!page) {
          return this.store.select(getRouterData)
            .pipe(
              map(data => {
                return { cache, type, Action: data.action }
              })
            )
        }

        // 根据page获取lastID
        return this.store.select(getLastID(page))
          .pipe(
            map(state => {
              const { lastID, Action } = state
              if (!lastID) {
                cache = true
              }

              return { cache, type, lastID, Action, page }
            })
          )
      }),
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
