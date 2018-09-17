import { Inject, Injectable, InjectionToken, Optional } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, asyncScheduler, EMPTY as empty, of } from 'rxjs'
import {
  debounceTime, map, switchMap, catchError,
} from 'rxjs/operators'

import { Topic } from '../models'
import { TopicTypes } from 'src/app/action/type'
import * as TopicAction from 'src/app/action/topic.action'
import { TopicService } from '../services/topic.service'

@Injectable()
export class TopicEffects {
  @Effect()
  topics$ = ({debounce = 300, scheduler = asyncScheduler} = {}): Observable<
    Action
  > =>
    this.action$.pipe(
      ofType<TopicAction.Topics>(TopicTypes.Topics),
      debounceTime(debounce, scheduler),
      map(action => action.payload),
      switchMap(payload => {
        console.log(payload)

        return empty
      })
    )

  @Effect()
  post$ = this.action$.pipe(
    ofType<TopicAction.Post>(TopicTypes.Post),
    map(action => action.payload),
    switchMap((payload: TopicParams) => {
      return this.topicService.post(payload).pipe(
        map((topic: Topic) => new TopicAction.PostSuccess(topic)),
        catchError(err => of(new TopicAction.PostFailure(err)))
      )
    })
  )

  constructor(
    private action$: Actions,
    private topicService: TopicService
  ) {}
}
