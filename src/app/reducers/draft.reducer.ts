import {
  topicListCase,
  topicPostCase,
  topicUpdateCase,
  topicTrashCase,
} from '../tools/create-reducer'
import {
  DraftTypes,
} from '../action/type'

const initState = {
  page: 1,
  total: 0,
  size: 50,
}

const draft = (state: PageState = {...initState, ids: []}, action: Action): PageState => {
  const { type, payload } = action
  
  switch(type) {
    case DraftTypes.TopicsSuccess: {
      return topicListCase(state, payload)
    }

    case DraftTypes.PostSuccess: {
      return topicPostCase(state, payload)
    }

    case DraftTypes.UpdateSuccess: {
      return topicUpdateCase(state, payload)
    }

    case DraftTypes.TrashSuccess: {
      return topicTrashCase(state, payload)
    }

    default: {
      return state
    }
  }
}

export default draft
