import { Topic } from '../models/topic.model'
import * as TopicAction from '../action/topic.action'

export interface State {
  ids: number[];
  entities: Topic[];
  selectedTopicID: number | null;
}

export const initialState: State = {
  ids: [],
  entities: [],
  selectedTopicID: null
}

export function topicReducer(state = initialState, action: TopicAction.Actions): State {
  switch(action.type) {
    case 'FETCH_TOPICS':
      return {
        ids: [...state.ids],
        entities: action.payload,
        selectedTopicID: state.selectedTopicID
      };
    case 'CREATE_TOPIC':
      return {
        ids: [...state.ids],
        entities: [...state.entities, action.payload],
        selectedTopicID: state.selectedTopicID
      };
    default:
      return state;
  }
}

export const getEntities = (state: any) => {
  return state.topic.entities;
}
export const getIds = (state: State) => state.ids
