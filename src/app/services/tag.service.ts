import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'

import { HttpService } from './http.service'
import * as TagAction from '../action/tag.action'
import { getTagList } from '../reducers/entities.reducer'

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(
    private http: HttpService,
    private store: Store<any>
  ) {}

  get tags$() {
    return this.store.pipe(select(getTagList))
  }

  fetchTag(tag: string): Observable<Array<Tag>> {
    const url = `search/tag/${tag}`
    return this.http.get(url)
      .pipe(
        map((res: Res) => res.data),
        catchError(_ => of([]))
      )
  }

  post(tag: string): Observable<Tag> {
    const url = `tag/create`
    const params = {
      name: tag
    }
    return this.http.post(url, params)
      .pipe(
        map((res: Res) => {
          this.store.dispatch(new TagAction.Post(res.data))
          return res.data
        }),
        catchError(_ => of(null))
      )
  }
}
