import { combineReducers } from '@ngrx/store'

import { createReducer } from '../tools/create-reducer'
import {
  SolvedTypes,
  PageState,
} from '../types/action.type'
import {
  QTopicsAction,
  ATopicsAction,
} from '../action/solved.action'

const question = createReducer<PageState, QTopicsAction>(SolvedTypes.QUESTION_TOPICS)
const answer = createReducer<PageState, ATopicsAction>(SolvedTypes.QUESTION_TOPICS)

export default combineReducers({question, answer})
