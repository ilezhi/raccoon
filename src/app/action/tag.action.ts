import { Action } from "@ngrx/store"

import { TagTypes } from './type'

export class Topics implements Action {
  readonly type = TagTypes.Topics
  constructor() {}
}

export class TopicsSuccess implements Action {
  readonly type = TagTypes.TopicsSuccess
  constructor(public payload: any) {}
}
