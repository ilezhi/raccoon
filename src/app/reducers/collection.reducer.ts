import {
  CollectTypes,
} from '../action/type'

const collection = (state: DState = {}, action: Action): DState => {
  const { type, payload } = action

  switch(type) {
    case CollectTypes.Topics: {
      const { folderID, total, page, tids } = payload
      let { ids, ...rest } = state[folderID]
      let unique = new Set(ids.concat(tids))
      ids = [...unique]

      return {
        ...state,
        [folderID]: {
          ...rest,
          page,
          total,
          ids,
        }
      }
    }

    default: {
      return state
    }
  }
}

export default collection
