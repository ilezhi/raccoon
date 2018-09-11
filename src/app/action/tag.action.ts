import { Action } from "@ngrx/store"

import { TagTypes, ListState } from '../types/action.type'
import { Tag } from "../models";

export class TagTopicsAction implements Action {
  readonly type = TagTypes.TOPICS
  constructor(public payload: ListState) {}
}

export class SearchTags implements Action {
  readonly type = TagTypes.SearchTags
  constructor(public payload: string) {}
}

export class Tags implements Action {
  readonly type = TagTypes.Tags
  constructor(public payload: Array<Tag>) {}
}
