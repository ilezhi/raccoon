import { createSelector } from '@ngrx/store'

import {
  topicListCase,
  topicPostCase,
  topicUpdateCase,
} from '../tools/create-reducer'
import {
  MyTypes,
  TopicTypes,
  SocketTypes
} from '../action/type'
import { getTopics } from './entities.reducer'
import * as utils from '../tools/util'
import { append } from '../tools/helper-reducer'

const my = (state: PageState, action: Action): PageState => {
  const { type, payload } = action
  
  switch(type) {
    case MyTypes.Topics: {
      return topicListCase(state, payload)
    }

    case TopicTypes.Post: {
      return topicPostCase(state, payload)
    }

    case TopicTypes.Update: {
      return topicUpdateCase(state, payload)
    }

    case TopicTypes.CommentAsAnswer: {
      if (!state) {
        return
      }

      const { id, answerID } = payload
      let ids = append(state.ids, id, !answerID)

      return { ids }
    }

    default: {
      return state
    }
  }
}

export const myState = (state) => {
  return state.my
}

export const getMy = createSelector(
  getTopics,
  myState,
  utils.getPageTopics
)

export default my
