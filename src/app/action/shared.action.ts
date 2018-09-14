import { Action } from "@ngrx/store"

import { SharedTypes } from './type'

export class SharedTopicsAction implements Action {
  readonly type = SharedTypes.Topics
  constructor(public payload: PageState) {}
}
