import { Action } from '@ngrx/store'

import { SolvedTypes } from './type'

export class Question implements Action {
  readonly type = SolvedTypes.QTopics
  constructor(public payload: MySchema) {}
}

export class Answer implements Action {
  readonly type = SolvedTypes.ATopics
  constructor(public payload: MySchema) {}
}
