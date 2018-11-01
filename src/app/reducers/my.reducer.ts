import { createSelector } from '@ngrx/store'

import {
  topicListCase,
  topicPostCase,
  topicUpdateCase,
  topicTrashCase,
} from '../tools/create-reducer'
import {
  MyTypes,
  TopicTypes
} from '../action/type'
import { getTopics } from './entities.reducer'
import * as utils from 'src/app/tools/util'

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
