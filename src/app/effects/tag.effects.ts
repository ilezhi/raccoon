import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import * as TagAction from 'src/app/action/tag.action'
import { TagTypes } from '../action/type'
import { TagService } from '../services/tag.service'

@Injectable()
export class TagEffects {
  @Effect()
  post$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<TagAction.Post>(TagTypes.Post),
      map(action => action.payload),
      switchMap((name: string) => {
        return this.tagService.post(name)
          .pipe(
            map((tag: Tag) => new TagAction.PostSuccess(tag))
          )
      })
    )
  
  constructor(
    private action$: Actions,
    private tagService: TagService
  ) {}
}
