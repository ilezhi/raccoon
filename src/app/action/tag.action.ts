import { Action } from '@ngrx/store'

import { TagTypes } from './type'

export class Post implements Action {
  readonly type = TagTypes.Post
  constructor(public payload: Tag) {}
}

export class Topics implements Action {
  readonly type = TagTypes.Topics
  constructor(public payload: MySchema) {}
}
