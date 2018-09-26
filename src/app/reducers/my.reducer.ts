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
    case MyTypes.TopicsSuccess: {
      return topicListCase(state, payload)
    }

    case TopicTypes.PostSuccess: {
      return topicPostCase(state, payload)
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

export const myState = (state) => {
  return state.my
}

export const getMyTopics = createSelector(
  getTopics,
  myState,
  utils.getPageTopics
)

export default my
