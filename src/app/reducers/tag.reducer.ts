import { createSelector } from '@ngrx/store'
import { TagTypes } from '../action/type'
import { getTopics } from './entities.reducer'
import * as utils from 'src/app/tools/util'

const tag = (state: DState = {}, action: Action): DState => {
  const { type, payload } = action

  switch(type) {
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
