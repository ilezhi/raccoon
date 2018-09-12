import { Action } from "@ngrx/store"

import { HomeTypes, PageState } from '../types/action.type'

export class AllTopicsAction implements Action {
  readonly type = HomeTypes.Topics
  constructor(public payload: PageState) {}
}

export class AwesomeTopicsAction implements Action {
  readonly type = HomeTypes.AWESOME_TOPICS
  constructor(public payload: PageState) {}
}

export class DeptTopicsAction implements Action {
  readonly type = HomeTypes.DEPT_TOPICS
  constructor(public payload: PageState) {}
}

export class TeamTopicsAction implements Action {
  readonly type = HomeTypes.TEAM_TOPICS
  constructor(public payload: PageState) {}
}
