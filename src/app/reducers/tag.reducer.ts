import { createSelector } from '@ngrx/store'
import { TagTypes, TopicTypes } from '../action/type'
import { getTopics } from './entities.reducer'
import * as utils from '../tools/util'
import { append } from '../tools/helper-reducer'

const tag = (state: DState = {}, action: Action): DState => {
  const { type, payload } = action

  switch (type) {
    case TagTypes.Topics: {
      let { id, result } = payload
      let tag = state[id]

      if (tag) {
        let ids = tag.ids
        result = new Set(ids.concat(result))
        result = [...result]
      }

      return {
        ...state,
        [id]: { ids: result }
      }
    }

    case TopicTypes.Post: {
      if (!state) {
        return state
      }

      const { result: id, entities: { topics } } = payload
      const tids = topics[id].tags

      let newState = JSON.parse(JSON.stringify(state))
      tids.forEach(tid => {
        let tag = newState[tid]

        if (tag) {
          tag.ids.unshift(id)
        }
      })

      return newState
    }

    case TopicTypes.Update: {
      if (!state) {
        return state
      }

      const { result: id, entities: { topics }, oldTags } = payload
      const tids = topics[id].tags
      let newState = JSON.parse(JSON.stringify(state))

      oldTags.forEach(t => {
        let tag = newState[t.id]
        if (tag) {
          const i = tag.ids.indexOf(id)
          tag.ids.splice(i, 1)
        }
      })

      tids.forEach(tid => {
        let tag = newState[tid]
        if (tag) {
          tag.ids.unshift(tid)
        }
      })

      return newState
    }

    case TopicTypes.CommentAsAnswer: {
      const { id } = payload

      let ids = []
      let tagID = 0
      for (let p in state) {
        if (!state.hasOwnProperty(p)) {
          continue
        }
        ids = state[p].ids
        if (ids.includes(id)) {
          tagID = +p
          ids = append(ids, id)
          break
        }
      }

      if (!tagID) {
        return state
      }

      return {
        ...state,
        [tagID]: { ids }
      }
    }

    default: {
      return state
    }
  }
}

const tagState = id => state => {
  return state.tag[id]
}

export const getTopicsByTagID = id => createSelector(
  getTopics,
  tagState(id),
  utils.getPageTopics
)

export default tag
