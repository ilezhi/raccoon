import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map, catchError, switchMap, tap } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'

import { HttpService } from './http.service'
import * as UserAction from '../action/user.action'
import { getUrl } from 'src/app/reducers'
import { getCategories, getCategoryByName, getTags, getInfo, getTagByName } from '../reducers/user.reducer'
import * as utils from '../tools/util'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false
  user: User
  categories: Category[]

  constructor(
    private http: HttpService,
    private store: Store<any>
  ) {}

  get user$(): Observable<User> {
    return this.store.pipe(
      select(getInfo),
      map(user => {
        if (!user || !user.id) {
          const info = utils.storage('user')
          this.store.dispatch(new UserAction.Login(info))
          return
        }

        return user
      }),
      switchMap(user => {
        if (!user) {
          return of(null)
        }

        if (!user.id) {
          return this.fetchLoginUser()
        }
        this.user = user
        return of(user)
      })
    )
  }

  get tags$(): Observable<Tag[]> {
    return this.store.pipe(select(getTags))
  }

  get categories$(): Observable<Category[]> {
    return this.store.pipe(
      select(getCategories),
      tap((categories: Category[]) => {
        this.categories = categories
      })
    )
  }

  get url$(): Observable<string> {
    return this.store.pipe(select(getUrl))
  }

  category$(name: string): Observable<Category> {
    return this.store.pipe(select(getCategoryByName(name)))
  }

  tag$(name: string): Observable<Tag> {
    return this.store.pipe(select(getTagByName(name)))
  }

  login(userInfo: LoginForm): Observable<boolean> {
    const { http, store } = this
    return http.post('signin', userInfo).pipe(
      map((res: Res) => {
        store.dispatch(new UserAction.Login(res.data))
        utils.storage('user', res.data)
        this.isLoggedIn = true
        return true
      }),
      catchError(_ => of(false))
    )
  }

  logout(): void {
    this.store.dispatch(new UserAction.Logout())
    utils.clearStorage('user')
  }

  signup(data: any): Observable<boolean> {
    return this.http.post('signup', data).pipe(
      map(_ => true),
      catchError(_ => of(false))
    )
  }

  fetchInfo(): Observable<boolean> {
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

  fetchDepartments(): Observable<Department[]> {
    return this.http.get('departments').pipe(
      map((res: Res) => res.data),
      catchError(_ => of([]))
    )
  }

  isExistByEmail(email: string): Observable<any> {
    return this.http.get('exist', { email }).pipe(
      map((res: Res) => {
        if (res.data) {
          return {exist: true, error: true}
        }

        return null
      }),
      catchError(_ => of({error: true}))
    )
  }
}
