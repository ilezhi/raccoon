import { combineReducers, ActionReducer, createSelector } from '@ngrx/store'

import * as utils from 'src/app/tools/util'
import {
  topicListCase,
  topicPostCase,
  topicUpdateCase,
} from '../tools/create-reducer'
import { append } from 'src/app/tools/helper-reducer'
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
    
      const { topicID } = payload
      let ids = append(state.ids, topicID)
      return { ids }
    }

    case SocketTypes.UpdateTopic:
    case TopicTypes.Update: {
      return topicUpdateCase(state, payload)
    }

    case TopicTypes.Top:
    case SocketTypes.Top:
    case SocketTypes.Awesome:
    case TopicTypes.Awesome: {
      if (!state) {
        return state
      }

      let { id, result } = payload
      id = id || result
      
      let ids = append(state.ids, id)

      return { ids }
    }

    case SocketTypes.Reply:
    case SocketTypes.Comment: {
      if (!state) {
        return state
      }

      let data: Comment | Reply = payload.comment || payload.reply
      const id = data.topicID

      let ids = append(state.ids, id)
      return { ids }
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

    case TopicTypes.Awesome:
    case SocketTypes.Awesome: {
      if (!state) {
        return state
      }

      let { id, awesome } = payload
      if (!id) {
        const { result, entities: { topics } } = payload
        id = result
        awesome = topics[id].awesome
      }
  
      let ids = append(state.ids, id, awesome)
      return { ids }
    }

    case SocketTypes.Reply:
    case SocketTypes.Comment: {
      if (!state) {
        return state
      }

      const { result: id, entities: { topics } } = payload
      const topic = topics[id]
      if (!topic.good) {
        return state
      }

      let ids = append(state.ids, id)

      return { ids }
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
