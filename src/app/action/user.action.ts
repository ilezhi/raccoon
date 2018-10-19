import { Action } from '@ngrx/store'

import { UserTypes } from './type'

export class Login implements Action {
  readonly type = UserTypes.Login
  constructor(public payload: LoginForm) {}
}

export class LoginSuccess implements Action {
  readonly type = UserTypes.LoginSuccess
  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = UserTypes.LoginFailure
  constructor() {}
}

export class Info implements Action {
  readonly type = UserTypes.Info
  constructor() {}
}

export class InfoSuccess implements Action {
  readonly type = UserTypes.InfoSuccess
  constructor(public payload: any) {}
}

export class InfoFailure implements Action {
  readonly type = UserTypes.InfoFailure
  constructor() {}
}

export class Category implements Action {
  readonly type = UserTypes.Category
  constructor(public payload: string) {}
}

export class CategorySuccess implements Action {
  readonly type = UserTypes.CategorySuccess
  constructor(public payload: any) {}
}

export class CategoryFailure implements Action {
  readonly type = UserTypes.CategoryFailure
  constructor() {}
}
