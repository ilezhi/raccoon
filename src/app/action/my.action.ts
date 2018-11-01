import { Action } from '@ngrx/store'

import { MyTypes } from './type'

export class My implements Action {
  readonly type = MyTypes.Topics
  constructor(public payload: MySchema) {}
}
