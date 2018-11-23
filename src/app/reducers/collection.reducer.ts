import { createSelector } from '@ngrx/store'

import {
  CollectTypes,
  TopicTypes
} from '../action/type'
import { getTopics } from './entities.reducer'
import * as utils from 'src/app/tools/util'

const collection = (state: DState = {}, action: Action): DState => {
  const { type, payload } = action

  switch(type) {
    case CollectTypes.Topics: {
      let { id, result } = payload
      let collection = state[id]
      
      if (collection) {
        let ids = collection.ids
        result = new Set(ids.concat(result))
        result = [...result]
      }

      return {
        ...state,
        [id]: { ids: result }
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
