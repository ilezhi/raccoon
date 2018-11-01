import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'

import { HttpService } from './http.service'
import * as UserAction from 'src/app/action/user.action'
import { getCategory } from 'src/app/reducers/user.reducer'
import * as utils from 'src/app/tools/util'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  categories$ = this.store.pipe(select(getCategory))

  constructor(
    private http: HttpService,
    private store: Store<any>
  ) {}

  login(userInfo: LoginForm): Observable<any> {
    const { http, store } = this
    return http.post('signin', userInfo).pipe(
      map((res: Res) => {
        store.dispatch(new UserAction.Login(res.data))
        utils.storage('user', res.data)
        return true
      }),
      catchError(_ => of(false))
    )
  }

  fetchInfo(): Observable<any> {
    const { http, store } = this
    return http.get('user/info').pipe(
      map((res: Res) => {
        store.dispatch(new UserAction.Info(res.data))     
        return true
      }),
      catchError(_ => of(false))
    )
  }

  postCategory(name: string): Observable<boolean> {
    const { http, store } = this
    return http.post('category/create', {name}).pipe(
      map((res: Res) => {
        store.dispatch(new UserAction.PostCategory(res.data))
        return true
      }),
      catchError(_ => of(false))
    )
  }

  fetchLoginUser(): Observable<boolean> {
    const { http, store } = this
    return http.get('user').pipe(
      map((res: Res) => {
        store.dispatch(new UserAction.Login(res.data))
        return true
      }),
      catchError(_ => of(false))
    )
  }
}
