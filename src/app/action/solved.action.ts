import { Action } from "@ngrx/store"

import { SolvedTypes } from './type'

export class QTopics implements Action {
  readonly type = SolvedTypes.QTopics
  constructor() {}
}

export class QTopicsSuccess implements Action {
  readonly type = SolvedTypes.QTopicsSuccess
  constructor(public payload: any) {}
}

export class ATopics implements Action {
  readonly type = SolvedTypes.ATopics
  constructor() {}
}

export class ATopicsSuccess implements Action {
  readonly type = SolvedTypes.ATopicsSuccess
  constructor(public payload: any) {}
}
