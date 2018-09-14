import { Action } from "@ngrx/store"

import { CollectTypes } from './type'

export class CollectionTopicsAction implements Action {
  readonly type = CollectTypes.Topics
  constructor(public payload: PageState) {}
}
