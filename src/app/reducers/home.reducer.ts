import { combineReducers, ActionReducer, createSelector } from '@ngrx/store'

import * as utils from 'src/app/tools/util'
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
import { getTopics } from './entities.reducer'


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

export const allState = (state) => {
  return state.home.all
}

export const awesomeState = (state) => {
  return state.home.awesome
}

export const getAll = createSelector(
  getTopics,
  allState,
  utils.getPageTopics
)

export const getAwesome = createSelector(
  getTopics,
  awesomeState,
  utils.getPageTopics
)

export const getTotal = (state) => {
  return state.home.all.total
}

const reducer: ActionReducer<any, Action> = combineReducers({all, awesome, dept, team})

export default reducer
