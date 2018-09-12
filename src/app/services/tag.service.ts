import { Injectable } from '@angular/core'
import { Subject, Observable, of } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators'

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
    this.tag$.next(tag)
  }

  listen(): Observable<any> {
    return this.tag$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    )
  }

  fetchTag(tag: string): Observable<Array<Tag>> {
    const url = `search/tag/${tag}`
    return this.http.get<Array<Tag>>(url)
      .pipe(
        catchError(_ => of([]))
      )
  }

  delTag(id: number) {
    this.delTag$.next(id)
  }
}
