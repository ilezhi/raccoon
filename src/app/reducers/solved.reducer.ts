
import { combineReducers } from '@ngrx/store'

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

const initState = {
  page: 1,
  total: 0,
  size: 50,
}

const question = (state: PageState = {...initState, ids: []}, action: Action): PageState => {
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

const answer = (state: PageState = {...initState, ids: []}, action: Action): PageState => {
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

export default combineReducers({question, answer})
