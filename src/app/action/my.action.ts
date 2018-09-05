import { Action } from '@ngrx/store'

import { MyTypes, PageState } from '../types/action.type'

export class MyTopicsAction implements Action {
  readonly type = MyTypes.TOPICS
  constructor(public payload: PageState) {}
}
