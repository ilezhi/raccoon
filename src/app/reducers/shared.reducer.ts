import { createSelector } from '@ngrx/store'

import { getTopics } from './entities.reducer'
import {
  topicListCase,
  topicPostCase,
  topicUpdateCase,
} from '../tools/create-reducer'
import {
  SharedTypes,
  TopicTypes
} from '../action/type'
import * as utils from 'src/app/tools/util'

const shared = (state: PageState, action: Action): PageState => {
  const { type, payload } = action
  
  switch(type) {
    case SharedTypes.Topics: {
      return topicListCase(state, payload)
    }

    case TopicTypes.Post: {
      const { shared } = payload
      return shared ? topicPostCase(state, payload) : state
    }

    case TopicTypes.Update: {
      return topicUpdateCase(state, payload)
    }

    default: {
      return state
    }
  }
}

export const sharedState = (state) => {
  return state.shared
}

export const getShared = createSelector(
  getTopics,
  sharedState,
  utils.getPageTopics
)

export default shared
