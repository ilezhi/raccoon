import {
  HomeTypes,
  MyTypes,
  SolvedTypes,
  CollectTypes,
  SharedTypes,
  DraftTypes,
  TagTypes,
} from '../action/type'

const initState = {
  loading: false
}

const global = (state = initState, action: Action): {} => {
  const { type } = action
  switch(type) {
    case HomeTypes.All:
    case HomeTypes.Awesome:
    case HomeTypes.Dept:
    case HomeTypes.Team:
    case MyTypes.Topics:
    case SolvedTypes.QTopics:
    case SolvedTypes.ATopics:
    case CollectTypes.Topics:
    case SharedTypes.Topics:
    case DraftTypes.Topics:
    case TagTypes.Topics: {
      return {
        loading: true
      }
    }

    default: {
      return state
    }
  }
}

export default global