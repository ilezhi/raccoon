import { Action } from "@ngrx/store"

import { HomeTypes } from './type'

export class AllSuccess implements Action {
  readonly type = HomeTypes.AllSuccess
  constructor(public payload: any) {}
}

export class AwesomeSuccess implements Action {
  readonly type = HomeTypes.AwesomeSuccess
  constructor(public payload: any) {}
}

export class DeptSuccess implements Action {
  readonly type = HomeTypes.DeptSuccess
  constructor(public payload: any) {}
}

export class TeamSuccess implements Action {
  readonly type = HomeTypes.TeamSuccess
  constructor(public payload: any) {}
}
