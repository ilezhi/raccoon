import { Action } from "@ngrx/store"

import { ProjectTypes, ListState } from '../types/action.type'

export class ProjectTopicsAction implements Action {
  readonly type = ProjectTypes.TOPICS
  constructor(public payload: ListState) {}
}
