import { Action } from "@ngrx/store"

import { SolvedTypes } from './type'

export class QTopicsSuccess implements Action {
  readonly type = SolvedTypes.QTopicsSuccess
  constructor(public payload: any) {}
}

export class ATopicsSuccess implements Action {
  readonly type = SolvedTypes.ATopicsSuccess
  constructor(public payload: any) {}
}
