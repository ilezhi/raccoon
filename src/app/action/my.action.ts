import { Action } from '@ngrx/store'

import { MyTypes } from './type'

export class MySuccess implements Action {
  readonly type = MyTypes.TopicsSuccess
  constructor(public payload: any) {}
}
