import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'

import { UserTypes } from 'src/app/action/type'
import * as UserAction from 'src/app/action/user.action'
import { UserService } from '../services/user.service'

@Injectable()
export class UserEffects {
  @Effect()
  login$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<UserAction.Login>(UserTypes.Login),
      map(action => action.payload),
      switchMap((payload: LoginForm) => {
        return this.userService.login(payload)
          .pipe(
            switchMap(user => {
              return this.userService.fetchInfo()
                .pipe(
                  map(info => {
                    return {info, user}
                  })
                )
            }),
            map(data => {
              return new UserAction.LoginSuccess(data)
            }),
            catchError(_ => {
              return of(new UserAction.LoginFailure())
            })
          )
      })
    )

  constructor(
    private action$: Actions,
    private userService: UserService
  ) {}
}