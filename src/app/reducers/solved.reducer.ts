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

const question = createReducer<PageState, QTopicsAction>(SolvedTypes.QuestionTopics)
const answer = createReducer<PageState, ATopicsAction>(SolvedTypes.QuestionTopics)

export default combineReducers({question, answer})
