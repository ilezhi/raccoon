import { combineReducers, ActionReducer, createSelector } from '@ngrx/store'

import * as utils from '../tools/util'
import {
  topicListCase,
  topicPostCase,
  topicUpdateCase,
} from '../tools/create-reducer'
import { append } from '../tools/helper-reducer'
import {
  HomeTypes,
  TopicTypes,
  SocketTypes,
} from '../action/type'
import { getTopics } from './entities.reducer'

const all = (state: PageState, action: Action): PageState => {
  const { type, payload } = action

  switch (type) {
    case HomeTypes.All: {
      return topicListCase(state, payload)
    }

    case SocketTypes.PostTopic:
    case TopicTypes.Post: {
      return topicPostCase(state, payload)
    }

    case SocketTypes.Answer:
    case TopicTypes.CommentAsAnswer:
    case TopicTypes.PostReply:
    case TopicTypes.PostComment: {
      if (!state) {
        return
      }

      const { topicID } = payload
      let ids = append(state.ids, topicID)
      return {
        ...state,
        ids
      }
    }

    case SocketTypes.UpdateTopic:
    case TopicTypes.Update: {
      return topicUpdateCase(state, payload)
    }

    case TopicTypes.Top: {
      if (!state) {
        return state
      }

      const { id, top } = payload
      let ids = [...state.ids]
      const i = ids.indexOf(id)

      if (top) {
        ids.splice(i, 1)
      } else {
        ids.unshift(id)
      }

      return {
        ...state,
        ids
      }
    }

    case SocketTypes.Top: {
      if (!state) {
        return state
      }

      const { result, topics } = payload
      const topic = topics[result]
      let ids = [...state.ids]

      if (topic.top) {
        const i = ids.indexOf(result)
        ids.splice(i, 1)
      } else {
        ids.unshift(result)
      }

      return {
        ...state,
        ids
      }
    }

    case SocketTypes.Awesome:
    case TopicTypes.Awesome: {
      if (!state) {
        return state
      }

      let { id, result } = payload
      id = id || result

      let ids = append(state.ids, id)

      return {
        ...state,
        ids
      }
    }

    case SocketTypes.Reply:
    case SocketTypes.Comment: {
      if (!state) {
        return state
      }

      let data: Comment | Reply = payload.comment || payload.reply
      const id = data.topicID

      let ids = append(state.ids, id)
      return {
        ...state,
        ids
      }
    }

    default: {
      return state
    }
  }
}

const top = (state: PageState, action: Action): PageState => {
  const { type, payload } = action

  switch (type) {
    case HomeTypes.Top: {
      return topicListCase(state, payload)
    }

    case TopicTypes.Top: {
      if (!state) {
        return
      }

      const { id, top } = payload
      let ids = [...state.ids]

      if (top) {
        ids.unshift(id)
      } else {
        const i = ids.indexOf(id)
        ids.splice(i, 1)
      }

      return {
        ...state,
        ids
      }
    }

    case SocketTypes.Top: {
      if (!state) {
        return state
      }

      const { result, topics } = payload
      const topic = topics[result]
      const ids = [...state.ids]

      if (topic.top) {
        ids.unshift(result)
      } else {
        const i = ids.indexOf(result)
        ids.splice(i, 1)
      }

      return {
        ...state,
        ids
      }
    }

    default: {
      return state
    }
  }
}

const awesome = (state: PageState, action: Action): PageState => {
  const { type, payload } = action

  switch (type) {
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
      return {
        ...state,
        ids
      }
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

      return {
        ...state,
        ids
      }
    }

    case SocketTypes.Answer:
    case TopicTypes.CommentAsAnswer: {
      if (!state) {
        return
      }

      const { id } = payload
      let ids = append(state.ids, id)
      return {
        ...state,
        ids
      }
    }

    default: {
      return state
    }
  }
}

const dept = (state: PageState, action: Action): PageState => {
  const { type, payload } = action

  switch (type) {
    case HomeTypes.Dept: {
      return topicListCase(state, payload)
    }

    case TopicTypes.Post: {
      return topicPostCase(state, payload)
    }

    case SocketTypes.PostTopic: {
      const { user: { deptID }, result: id, topics } = payload
      const topic = topics[id]

      if (topic.deptID !== deptID) {
        return state
      }

      let ids = [...state.ids]
      ids.unshift(id)

      return {
        ...state,
        ids
      }
    }

    case TopicTypes.Update: {
      return topicUpdateCase(state, payload)
    }

    case SocketTypes.Answer:
    case TopicTypes.CommentAsAnswer: {
      if (!state) {
        return
      }

      const { id } = payload
      let ids = append(state.ids, id)
      return {
        ...state,
        ids
      }
    }

    default: {
      return state
    }
  }
}

const team = (state: PageState, action: Action): PageState => {
  const { type, payload } = action

  switch (type) {
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

export const topState = (state) => {
  return state.home.top
}

export const allState = (state) => {
  return state.home.all
}

export const awesomeState = (state) => {
  return state.home.awesome
}

export const deptState = (state) => {
  return state.home.dept
}

export const getAll = createSelector(
  getTopics,
  allState,
  topState,
  utils.getPageTopics
)

export const getAwesome = createSelector(
  getTopics,
  awesomeState,
  utils.getPageTopics
)

export const getDept = createSelector(
  getTopics,
  deptState,
  utils.getPageTopics
)

export const getTotal = (state) => {
  return state.home.all.total
}

const reducer: ActionReducer<any, Action> = combineReducers({all, awesome, dept, team, top})

export default reducer
