import { Injectable } from '@angular/core'
import { Subject, Observable, of } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap, map } from 'rxjs/operators'

import { Tag } from '../models'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tag$ = new Subject<string>()
  delTag$ = new Subject<number>()

  constructor(
    private http: HttpService
  ) {}

  input(tag: string) {
    tag = tag.trim() || 'all'
    this.tag$.next(tag)
  }

  search(): Observable<Tag[]> {
    return this.tag$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(tag => {
        return this.fetchTag(tag)
      })
    )
  }

  fetchTag(tag: string): Observable<Array<Tag>> {
    const url = `search/tag/${tag}`
    return this.http.get<Array<Tag>>(url)
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
    return this.http.post<Tag>(url, params)
      .pipe(
        map((res: Res) => res.data),
        catchError(_ => of(null))
      )
  }
}
