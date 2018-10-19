import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'

import { HttpService } from './http.service'
import { CategorySuccess } from 'src/app/action/user.action'
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
    return this.http.post('signin', userInfo)
  }

  fetchInfo(): Observable<any> {
    return this.http.get('user/info')
  }

  postCategory(name: string): Observable<boolean> {
    const { http, store } = this
    return http.post('category/create', {name}).pipe(
      map(data => {
        store.dispatch(new CategorySuccess(data))
        return true
      }),
      catchError(_ => of(false))
    )
  }
}
