import { Action } from "@ngrx/store"

import { SolvedTypes, PageState } from '../types/action.type'

export class QTopicsAction implements Action {
  readonly type = SolvedTypes.QuestionTopics
  constructor(public payload: PageState) {}
}

export class ATopicsAction implements Action {
  readonly type = SolvedTypes.AnswerTopics
  constructor(public payload: PageState) {}
}
