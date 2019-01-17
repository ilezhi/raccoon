import { Action } from '@ngrx/store'

import { HomeTypes } from './type'

export class All implements Action {
  readonly type = HomeTypes.All
  constructor(public payload: MySchema) {}
}

export class Awesome implements Action {
  readonly type = HomeTypes.Awesome
  constructor(public payload: MySchema) {}
}

export class Dept implements Action {
  readonly type = HomeTypes.Dept
  constructor(public payload: MySchema) {}
}

export class Team implements Action {
  readonly type = HomeTypes.Team
  constructor(public payload: MySchema) {}
}

export class Top implements Action {
  readonly type = HomeTypes.Top
  constructor(public payload: MySchema) {}
}
