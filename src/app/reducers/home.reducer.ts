import { combineReducers, ActionReducer, createSelector } from '@ngrx/store'

import * as utils from 'src/app/tools/util'
import {
  topicListCase,
  topicPostCase,
  topicUpdateCase,
} from '../tools/create-reducer'
import {
  HomeTypes,
  TopicTypes,
  SocketTypes,
} from '../action/type'
import { getTopics } from './entities.reducer'

const all = (state: PageState, action: Action): PageState => {
  const { type, payload } = action

  switch(type) {
    case HomeTypes.All: {
      return topicListCase(state, payload)
    }

    case SocketTypes.PostTopic:
    case TopicTypes.Post: {
      return topicPostCase(state, payload)
    }

    case TopicTypes.PostReply:
    case TopicTypes.PostComment: {
      if (!state) {
        return
      }
    
      let ids = [...state.ids]
      const { topicID } = payload
      const i = state.ids.indexOf(topicID)
      if (i !== -1) {
        ids.splice(i, 1)
      }
    
      ids.unshift(topicID)
      return { ids }
    }

    case SocketTypes.UpdateTopic:
    case TopicTypes.Update: {
      return topicUpdateCase(state, payload)
    }

    default: {
      return state
    }
  }
}

const awesome = (state: PageState, action: Action): PageState => {
  const { type, payload } = action

  switch(type) {
    case HomeTypes.Awesome: {
      return topicListCase(state, payload)
    }

    case TopicTypes.Update: {
      const { good } = payload
      return good ? topicUpdateCase(state, payload) : state
    }

    default: {
      return state
    }
  }
}

const dept = (state: PageState, action: Action): PageState => {
  const { type, payload } = action

  switch(type) {
    case HomeTypes.Dept: {
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

const team = (state: PageState, action: Action): PageState => {
  const { type, payload } = action

  switch(type) {
    case HomeTypes.Team: {
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
