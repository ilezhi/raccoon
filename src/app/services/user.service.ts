import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store'

import { HttpService } from './http.service'
import { Category } from 'src/app/action/user.action'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpService,
    private store: Store<any>
  ) {}

  login(userInfo: LoginForm): Observable<any> {
    return this.http.post('signin', userInfo)
      .pipe(
        map((res: Res) => res.data)
      )
  }

  fetchInfo(): Observable<any> {
    return this.http.get('user/info')
      .pipe(
        map((res: Res) => res.data)
      )
  }

  newCategory(name: string): void {
    this.store.dispatch(new Category(name))
  }

  postCategory(name: string): Observable<any> {
    return this.http.post('category/create', {name}).pipe(
      map((res: Res) => res.data)
    )
  }
}
