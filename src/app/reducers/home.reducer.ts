import { combineReducers } from '@ngrx/store'

import {
  topicListCase,
  topicPostCase,
  topicUpdateCase,
  topicTrashCase,
} from '../tools/create-reducer'
import {
  HomeTypes,
  TopicTypes
} from '../action/type'

const initState = {
  page: 1,
  total: 0,
  size: 50,
}

const all = (state: PageState = {...initState, ids: []}, action: Action): PageState => {
  const { type, payload } = action

  switch(type) {
    case HomeTypes.AllSuccess: {
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

const awesome = (state: PageState = {...initState, ids: []}, action: Action): PageState => {
  const { type, payload } = action

  switch(type) {
    case HomeTypes.AwesomeSuccess: {
      return topicListCase(state, payload)
    }

    case TopicTypes.UpdateSuccess: {
      const { good } = payload
      return good ? topicUpdateCase(state, payload) : state
    }

    case TopicTypes.TrashSuccess: {
      const { good } = payload
      return good ? topicTrashCase(state, payload) : state
    }

    default: {
      return state
    }
  }
}

const dept = (state: PageState = {...initState, ids: []}, action: Action): PageState => {
  const { type, payload } = action

  switch(type) {
    case HomeTypes.DeptSuccess: {
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

const team = (state: PageState = {...initState, ids: []}, action: Action): PageState => {
  const { type, payload } = action

  switch(type) {
    case HomeTypes.TeamSuccess: {
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

export const getAll = (state) => {
  return state.home.all
}

export default combineReducers({all, awesome, dept, team})
