
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
import { append } from 'src/app/tools/helper-reducer'

const question = (state: PageState, action: Action): PageState => {
  const { type, payload } = action
  
  switch(type) {
    case SolvedTypes.QTopics: {
      return topicListCase(state, payload)
    }

    case TopicTypes.Update: {
      return topicUpdateCase(state, payload)
    }

    case TopicTypes.CommentAsAnswer: {
      if (!state) {
        return
      }

      const { id, answerID } = payload
      let ids = append(state.ids, id, !!answerID)

      return { ids }
    }

    default: {
      return state
    }    
  }
}

const answer = (state: PageState, action: Action): PageState => {
  const { type, payload } = action

  switch(type) {
    case SolvedTypes.ATopics: {
      return topicListCase(state, payload)
    }

    case TopicTypes.Update: {
      return topicUpdateCase(state, payload)
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

export const getQuestion = createSelector(
  getTopics,
  questionState,
  utils.getPageTopics
)

export const getAnswer = createSelector(
  getTopics,
  answerState,
  utils.getPageTopics
)

export default combineReducers({question, answer})
