import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { asyncScheduler, EMPTY as empty, Observable, of } from 'rxjs'
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators'

import { Tag } from 'src/app/models'
import { TagTypes } from 'src/app/types/action.type'
import { SearchTags, Tags } from 'src/app/action/tag.action'
import { TagService } from 'src/app/services/tag.service'

@Injectable()
export class TagEffects {
  @Effect()
  search$ = ({ debounce = 300, scheduler = asyncScheduler} = {}): Observable<
    Action
  > =>
    this.action$.pipe(
      ofType<SearchTags>(TagTypes.SearchTags),
      debounceTime(debounce, scheduler),
      map(action => action.payload),
      switchMap(query => {
        if (query === '') {
          return empty
        }
        
        const nextSearch$ = this.action$.pipe(
          ofType(TagTypes.SearchTags),
          skip(1)
        )


        return this.tagService.fetchTag().pipe(
          takeUntil(nextSearch$),
          map((tags: Tag[]) => new Tags(tags))
        )
      })
    )


  constructor(
    private action$: Actions,
    private tagService: TagService
  ) {}
}
