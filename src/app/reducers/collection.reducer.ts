import { createSelector } from '@ngrx/store'

import {
  CollectTypes,
  TopicTypes,
  SocketTypes
} from '../action/type'
import { getTopics } from './entities.reducer'
import * as utils from '../tools/util'
import { append } from '../tools/helper-reducer'

const collection = (state: DState = {}, action: Action): DState => {
  const { type, payload } = action

  switch (type) {
    case CollectTypes.Topics: {
      let { id, result, done } = payload
      let collection = state[id]

      if (collection) {
        let ids = collection.ids
        result = new Set(ids.concat(result))
        result = [...result]
      }

      return {
        ...state,
        [id]: { ids: result, done }
      }
    }

    case TopicTypes.Favor: {
      const { topicID, categoryID, isFavor } = payload
      const c = state[categoryID]

      if (!c) {
        return state
      }

      let ids = [...c.ids]
      if (isFavor) {
        ids.unshift(topicID)
      } else {
        const i = ids.indexOf(topicID)
        ids.splice(i, 1)
      }

      return {
        ...state,
        [categoryID]: { ids }
      }
    }

    case SocketTypes.Answer:
    case TopicTypes.CommentAsAnswer: {
      const { id } = payload

      let ids = []
      let cid = 0
      for (let p in state) {
        if (!state.hasOwnProperty(p)) {
          continue
        }

        ids = state[p].ids
        if (ids.includes(id)) {
          cid = +p
          ids = append(ids, id)
          break
        }
      }

      if (!cid) {
        return state
      }

      return {
        ...state,
        [cid]: { ids }
      }
    }

    default: {
      return state
    }
  }
}

const collectionState = id => state => {
  return state.collection[id]
}

export const getTopicsByCollectionID = id => createSelector(
  getTopics,
  collectionState(id),
  utils.getPageTopics
)

export default collection
