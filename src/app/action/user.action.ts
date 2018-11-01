import { Action } from '@ngrx/store'

import { UserTypes } from './type'

export class Login implements Action {
  readonly type = UserTypes.Login
  constructor(public payload: any) {}
}

export class Info implements Action {
  readonly type = UserTypes.Info
  constructor(public payload: any) {}
}

export class PostCategory implements Action {
  readonly type = UserTypes.PostCategory
  constructor(public payload: any) {}
}
