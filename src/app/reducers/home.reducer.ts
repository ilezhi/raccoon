import { combineReducers } from '@ngrx/store'

import { createReducer } from '../tools/create-reducer'
import {
  HomeTypes,
  PageState,
} from '../types/action.type'
import {
  AllTopicsAction,
  AwesomeTopicsAction,
  DeptTopicsAction,
  TeamTopicsAction,
} from '../action/home.action'

const all = createReducer<PageState, AllTopicsAction>(HomeTypes.TOPICS)
const awesome = createReducer<PageState, AwesomeTopicsAction>(HomeTypes.AWESOME_TOPICS)
const dept = createReducer<PageState, DeptTopicsAction>(HomeTypes.DEPT_TOPICS)
const team = createReducer<PageState, TeamTopicsAction>(HomeTypes.TEAM_TOPICS)

export const getHome = (state: any) => {
  return state
}

export default combineReducers({all, awesome, dept, team})
