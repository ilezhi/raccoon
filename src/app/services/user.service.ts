import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'

import { HttpService } from './http.service'
import { CategorySuccess, LoginSuccess } from 'src/app/action/user.action'
import { getCategory } from 'src/app/reducers/user.reducer'

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
    return this.http.post('signin', userInfo).pipe(
      map((res: Res) => res.data)
    )
  }

  fetchInfo(): Observable<any> {
    return this.http.get('user/info').pipe(
      map((res: Res) => res.data)
    )
  }

  postCategory(name: string): Observable<boolean> {
    const { http, store } = this
    return http.post('category/create', {name}).pipe(
      map((res: Res) => {
        store.dispatch(new CategorySuccess(res.data))
        return true
      }),
      catchError(_ => of(false))
    )
  }

  fetchLoginUser(): Observable<boolean> {
    const { http, store } = this
    return http.get('user').pipe(
      map((res: Res) => {
        store.dispatch(new LoginSuccess(res.data))
        return true
      }),
      catchError(_ => of(false))
    )
  }
}
