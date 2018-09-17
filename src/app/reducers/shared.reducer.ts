import {
  topicListCase,
  topicPostCase,
  topicUpdateCase,
  topicTrashCase,
} from '../tools/create-reducer'
import {
  SharedTypes,
  TopicTypes
} from '../action/type'

const initState = {
  page: 1,
  total: 0,
  size: 50,
}

const shared = (state: PageState = {...initState, ids: []}, action: Action): PageState => {
  const { type, payload } = action
  
  switch(type) {
    case SharedTypes.TopicsSuccess: {
      return topicListCase(state, payload)
    }

    case TopicTypes.PostSuccess: {
      const { shared } = payload
      return shared ? topicPostCase(state, payload) : state
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

export default shared
