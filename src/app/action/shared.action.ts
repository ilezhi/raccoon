import { Action } from "@ngrx/store"

import { SharedTypes, PageState } from '../types/action.type'

export class SharedTopicsAction implements Action {
  readonly type = SharedTypes.Topics
  constructor(public payload: PageState) {}
}
