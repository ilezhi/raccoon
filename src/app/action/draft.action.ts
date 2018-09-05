import { Action } from "@ngrx/store"

import { DraftTypes, PageState } from '../types/action.type'

export class DraftTopicsAction implements Action {
  readonly type = DraftTypes.TOPICS
  constructor(public payload: PageState) {}
}
