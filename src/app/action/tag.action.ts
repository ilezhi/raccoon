import { Action } from "@ngrx/store"

import { TagTypes, ListState } from '../types/action.type'

export class TagTopicsAction implements Action {
  readonly type = TagTypes.TOPICS
  constructor(public payload: ListState) {}
}
