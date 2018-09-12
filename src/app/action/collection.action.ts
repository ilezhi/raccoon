import { Action } from "@ngrx/store"

import { CollectTypes, PageState } from '../types/action.type'

export class CollectionTopicsAction implements Action {
  readonly type = CollectTypes.Topics
  constructor(public payload: PageState) {}
}
