import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'

import { HttpService } from './http.service'
import * as UserAction from 'src/app/action/user.action'
import { getCategories, getCategoryByName, getTags } from 'src/app/reducers/user.reducer'
import * as utils from 'src/app/tools/util'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpService,
    private store: Store<any>
  ) {}

  get tags$() {
    return this.store.pipe(select(getTags))
  }

  get categories$() {
    return this.store.pipe(select(getCategories))
  }

  category$(name: string) {
    return this.store.pipe(select(getCategoryByName(name)))
  }

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
