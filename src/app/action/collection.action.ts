import { Action } from "@ngrx/store"

import { CollectTypes } from './type'

export class Topics implements Action {
  readonly type = CollectTypes.Topics
  constructor(public payload: MySchema) {}
}
