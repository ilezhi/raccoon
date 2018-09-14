import { combineReducers } from '@ngrx/store'

import {
  TopicTypes,
  HomeTypes
} from '../action/type'

const topics = (state: KeyMap = {}, action: any) => {
  const { type, payload } = action
  console.log('entities reducer')
  switch(type) {
    case HomeTypes.AllSuccess:
    case HomeTypes.DeptSuccess:
    case HomeTypes.TeamSuccess:
    case HomeTypes.AwesomeSuccess:
    case TopicTypes.TopicsSuccess: {
      const { entities } = payload
      return {
        ...state,
        ...entities
      }
    }

    case TopicTypes.TopicSuccess:
    case TopicTypes.PostSuccess:
    case TopicTypes.UpdateSuccess: {
      const { id } = payload
      return {
        ...state,
        [id]: payload
      }
    }

    case TopicTypes.TrashSuccess: {
      const { id } = payload
      delete state[id]
      return {
        ...state
      }
    }

    default: {
      return state
    }
  }
}

export default combineReducers({topics})
