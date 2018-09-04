import {
  User,
  Topic,
  Tag,
  Comment,
  Reply,
} from '../models'

import { EntityTypes, AddUserAction, AddTopicAction, AddTagAction, AddCommentAction, AddReplyAction } from '../action/entity.action'
import { combineReducers, ActionReducerMap } from '@ngrx/store';
import { StateTree } from './index'

interface State<T> {
  [key: number]: T
}

interface Action {
  type: string;
  payload: any;
}

function createEntity<S, A extends Action>(condition) {
  return function entity(state: State<S> = {}, action: A) {
    const { type, payload } = action
    switch(type) {
      case condition: {
        return { ...state, ...payload}
      }

      default:
        return state
    }
  }
}

const users = createEntity<User, AddUserAction>(EntityTypes.ADD_USER)
const topics = createEntity<Topic, AddTopicAction>(EntityTypes.ADD_TOPIC)
const tags = createEntity<Tag, AddTagAction>(EntityTypes.ADD_TAG)
const comments = createEntity<Comment, AddCommentAction>(EntityTypes.ADD_COMMENT)
const replies = createEntity<Reply, AddReplyAction>(EntityTypes.ADD_USER)

export const getUsers = (state: StateTree) => {
  return state.entities.users
}

export default combineReducers({users, topics, tags, comments, replies})
