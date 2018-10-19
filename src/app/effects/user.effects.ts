import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'

import { UserTypes } from 'src/app/action/type'
import * as UserAction from 'src/app/action/user.action'
import { UserService } from '../services/user.service'
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  @Effect()
  login$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<UserAction.Login>(UserTypes.Login),
      map(action => action.payload),
      switchMap((payload: LoginForm) => {
        return this.userService.login(payload).pipe(
          map(user => {
            this.router.navigate(['/'])
            return new UserAction.LoginSuccess(user)
          }),
          catchError(_ => {
            return of(new UserAction.LoginFailure())
          })
        )
      })
    )

  @Effect()
  info$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<UserAction.Info>(UserTypes.Info),
      switchMap(() => {
        return this.userService.fetchInfo().pipe(
          map(data => new UserAction.InfoSuccess(data)),
          catchError(_ => of(new UserAction.InfoFailure()))
        )
      })
    )

  @Effect()
  category$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<UserAction.Category>(UserTypes.Category),
      map(action => action.payload),
      switchMap(name => {
        return this.userService.postCategory(name).pipe(
          map(data => new UserAction.CategorySuccess(data)),
          catchError(_ => of(new UserAction.CategoryFailure())) 
        )
      })
    )

  constructor(
    private action$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}