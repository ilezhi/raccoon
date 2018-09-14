import { Action } from '@ngrx/store'

import { MyTypes } from './type'

export class MyTopicsAction implements Action {
  readonly type = MyTypes.Topics
  constructor(public payload: PageState) {}
}
