import { Action } from "@ngrx/store"

import { HomeTypes } from './type'

export class All implements Action {
  readonly type = HomeTypes.All
  constructor() {}
}

export class AllSuccess implements Action {
  readonly type = HomeTypes.AllSuccess
  constructor(public payload: any) {}
}

export class Awesome implements Action {
  readonly type = HomeTypes.Awesome
  constructor() {}
}

export class AwesomeSuccess implements Action {
  readonly type = HomeTypes.AwesomeSuccess
  constructor(public payload: any) {}
}

export class Dept implements Action {
  readonly type = HomeTypes.Dept
  constructor() {}
}

export class DeptSuccess implements Action {
  readonly type = HomeTypes.DeptSuccess
  constructor(public payload: any) {}
}

export class Team implements Action {
  readonly type = HomeTypes.Team
  constructor() {}
}

export class TeamSuccess implements Action {
  readonly type = HomeTypes.TeamSuccess
  constructor(public payload: any) {}
}
