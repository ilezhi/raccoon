import { combineReducers } from '@ngrx/store'

import {
  TopicTypes,
  DraftTypes,
  HomeTypes
} from '../action/type'

const topics = (state: KeyMap = {}, action: Action): KeyMap => {
  const { type, payload } = action

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
      const { topics } = payload.entities
      return {
        ...state,
        ...topics
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

const draft = (state: KeyMap = {}, action: Action): KeyMap => {
  const { type, payload } = action

  switch(type) {
    case DraftTypes.TopicsSuccess: {
      const { entities } = payload
      return {
        ...state,
        ...entities
      }
    }

    case DraftTypes.TopicSuccess:
    case DraftTypes.PostSuccess:
    case DraftTypes.UpdateSuccess: {
      const { id } = payload
      return {
        ...state,
        [id]: payload
      }
    }

    case DraftTypes.TrashSuccess: {
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

const tags = (state: KeyMap = {}, action: Action): KeyMap => {
  const { type, payload } = action
  switch(type) {
    case TopicTypes.TopicSuccess:
    case TopicTypes.PostSuccess:
    case TopicTypes.UpdateSuccess: {
      const { tags } = payload.entities

      const ids = Object.keys(tags).filter(id => !state[id])
      if (!ids.length) {
        return state
      }

      const newTags = ids.reduce((obj, id) => {
        obj[id] = tags[id]
        return obj
      }, {})

      return {
        ...state,
        ...newTags
      }
    }

    default: {
      return state
    }
  }
}

export default combineReducers({topics, draft, tags})
