import { Action } from "@ngrx/store"

import { TagTypes } from './type'

export class Post implements Action {
  readonly type = TagTypes.Post
  constructor(public payload: string) {}
}

export class PostSuccess implements Action {
  readonly type = TagTypes.PostSuccess
  constructor(public payload: Tag) {}
}
