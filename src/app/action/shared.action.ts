import { Action } from "@ngrx/store"

import { SharedTypes } from './type'

export class Shared implements Action {
  readonly type = SharedTypes.Topics
  constructor(public payload: MySchema) {}
}
