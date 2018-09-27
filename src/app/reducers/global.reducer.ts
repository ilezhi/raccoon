import {
  HomeTypes,
  MyTypes,
  SolvedTypes,
  CollectTypes,
  SharedTypes,
  DraftTypes,
  TagTypes,
  TopicTypes,
} from '../action/type'

const initState = {
  loading: false
}

const global = (state = initState, action: Action): {} => {
  const { type } = action
  switch(type) {
    case TopicTypes.Topics:
    case SolvedTypes.QTopics:
    case SolvedTypes.ATopics:
    case CollectTypes.Topics:
    case SharedTypes.Topics:
    case DraftTypes.Topics:
    case TagTypes.Topics: {
      return {
        ...state,
        loading: true,
      }
    }

    case HomeTypes.AllSuccess:
    case HomeTypes.AwesomeSuccess:
    case HomeTypes.DeptSuccess:
    case HomeTypes.TeamSuccess:
    case MyTypes.TopicsSuccess: {
      return {
        ...state,
        loading: false
      }
    }

    default: {
      return state
    }
  }
}

export const getLoading = (state) => {
  return state.global.loading
}

export default global
