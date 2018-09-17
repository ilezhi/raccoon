import {
  topicListCase,
  topicPostCase,
  topicUpdateCase,
  topicTrashCase,
} from '../tools/create-reducer'
import {
  MyTypes,
  TopicTypes
} from '../action/type'

const initState = {
  page: 1,
  total: 0,
  size: 50,
}

const my = (state: PageState = {...initState, ids: []}, action: Action): PageState => {
  const { type, payload } = action
  
  switch(type) {
    case MyTypes.TopicsSuccess: {
      return topicListCase(state, payload)
    }

    case TopicTypes.PostSuccess: {
      return topicPostCase(state, payload)
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

export default my
