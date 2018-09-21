import { combineReducers, ActionReducer } from '@ngrx/store'

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

const all = (state: PageState, action: Action): PageState => {
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

const awesome = (state: PageState, action: Action): PageState => {
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

const dept = (state: PageState, action: Action): PageState => {
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

const team = (state: PageState, action: Action): PageState => {
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
  const all = state.home.all
  if (!all) {
    return
  }

  const { page, size, ids } = all
  const { topics } = state.entities

  const end = page * size
  const start = end - size
  const data = ids.slice(start, end).map(id => topics[id])

  return data
}

export const getTotal = (state) => {
  return state.home.all.total
}

const reducer: ActionReducer<any, Action> = combineReducers({all, awesome, dept, team})

export default reducer
