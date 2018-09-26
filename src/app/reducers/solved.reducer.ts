
import { combineReducers, createSelector } from '@ngrx/store'

import {
  topicListCase,
  topicPostCase,
  topicUpdateCase,
  topicTrashCase,
} from '../tools/create-reducer'
import {
  SolvedTypes,
  TopicTypes
} from '../action/type'
import { getTopics } from './entities.reducer'
import * as utils from 'src/app/tools/util'

const question = (state: PageState, action: Action): PageState => {
  const { type, payload } = action
  
  switch(type) {
    case SolvedTypes.QTopicsSuccess: {
      return topicListCase(state, payload)
    }

    case TopicTypes.UpdateSuccess: {
      return topicUpdateCase(state, payload)
    }

    case TopicTypes.TrashSuccess: {
      return topicTrashCase(state, payload)
    }

    default: {
      return state
    }    
  }
}

const answer = (state: PageState, action: Action): PageState => {
  const { type, payload } = action

  switch(type) {
    case SolvedTypes.ATopicsSuccess: {
      return topicListCase(state, payload)
    }

    case TopicTypes.UpdateSuccess: {
      return topicUpdateCase(state, payload)
    }

    case TopicTypes.TrashSuccess: {
      return topicTrashCase(state, payload)
    }

    default: {
      return state
    }
  }
}

export const questionState = (state) => {
  return state.solved.question
}

export const answerState = (state) => {
  return state.solved.answer
}

export const getQTopics = createSelector(
  getTopics,
  questionState,
  utils.getPageTopics
)

export const getATopics = createSelector(
  getTopics,
  answerState,
  utils.getPageTopics
)

export default combineReducers({question, answer})
