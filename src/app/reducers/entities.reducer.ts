import { combineReducers, createSelector } from '@ngrx/store'

import {
  TopicTypes,
  DraftTypes,
  HomeTypes,
  MyTypes,
  SolvedTypes,
  TagTypes
} from '../action/type'

const topics = (state: KeyMap = {}, action: Action): KeyMap => {
  const { type, payload } = action

  switch(type) {
    case HomeTypes.AllSuccess:
    case HomeTypes.DeptSuccess:
    case HomeTypes.TeamSuccess:
    case HomeTypes.AwesomeSuccess:
    case TopicTypes.TopicsSuccess:
    case MyTypes.TopicsSuccess:
    case SolvedTypes.QTopicsSuccess:
    case SolvedTypes.ATopicsSuccess: {

      if (typeof payload === 'number') {
        return state
      }

      const { topics } = payload.entities
      for (const id in topics) {
        const topic = state[id]
        if (topic && topic.content.length >= 140) {
          delete topics[id]
        }
      }

      return {
        ...state,
        ...topics
      }
    }

    case TopicTypes.DetailSuccess:
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

  if (!payload) {
    return state
  }

  switch(type) {
    case HomeTypes.AllSuccess:
    case HomeTypes.DeptSuccess:
    case HomeTypes.TeamSuccess:
    case HomeTypes.AwesomeSuccess:
    case TopicTypes.TopicsSuccess:
    case TopicTypes.DetailSuccess:
    case TopicTypes.PostSuccess:
    case TopicTypes.UpdateSuccess: {
      if (typeof payload === 'number') {
        return state
      }

      const { tags } = payload.entities
      
      if (!tags) {
        return state
      }

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

    case TagTypes.PostSuccess: {
      const { id } = payload

      if (state[id]) {
        return state
      }

      return {
        ...state,
        [id]: payload 
      }
    }

    default: {
      return state
    }
  }
}

export const getTopics = (state) => {
  return state.entities.topics
}

export const getTopic = (id) => createSelector(
  getTopics,
  topics => topics[id]
)

export const getTags = (state) => {
  return state.entities.tags
}

export default combineReducers({topics, draft, tags})
