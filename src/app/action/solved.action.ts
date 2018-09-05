import { Action } from "@ngrx/store"

import { SolvedTypes, PageState } from '../types/action.type'

export class QTopicsAction implements Action {
  readonly type = SolvedTypes.QUESTION_TOPICS
  constructor(public payload: PageState) {}
}

export class ATopicsAction implements Action {
  readonly type = SolvedTypes.ANSWER_TOPICS
  constructor(public payload: PageState) {}
}
