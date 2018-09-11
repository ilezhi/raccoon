import { Injectable } from '@angular/core'
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Tag } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tag$ = new Subject<string>()

  constructor() {}

  input(tag: string) {
    this.tag$.next(tag)
  }

  listen(): Observable<string> {
    return this.tag$.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    )
  }

  // getByTag(tag: string): Array<Tag> {
    
  // }
  fetchTag(): Observable<Array<Tag>> {
    const tags = [
      {id: 1, name: 'javascript'},
      {id: 2, name: 'web'},
      {id: 3, name: '算法'}
    ]

    return of(tags)
  }
}
