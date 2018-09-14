import { Action } from "@ngrx/store"

import { DraftTypes } from './type'

export class DraftTopicsAction implements Action {
  readonly type = DraftTypes.Topics
  constructor(public payload: PageState) {}
}
