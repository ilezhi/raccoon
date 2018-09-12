import { combineReducers } from '@ngrx/store'

import { createEntity } from '../tools/create-reducer'
import {
  EntityTypes,
  HomeTypes,
  MyTypes,
  SolvedTypes,
  CollectTypes,
  SharedTypes,
  DraftTypes,
  KeyMap,
} from '../types/action.type'
import {
  User,
  Topic,
  Tag,
  Comment,
  Reply,
} from '../models'
import {
  AddUserAction,
  AddTopicAction,
  AddTagAction,
  AddCommentAction,
  AddReplyAction,
} from '../action/entity.action'

const users = createEntity<User, AddUserAction>(EntityTypes.ADD_USER)
// const topics = createEntity<Topic, AddTopicAction>(EntityTypes.ADD_TOPIC)
const tags = createEntity<Tag, AddTagAction>(EntityTypes.ADD_TAG)
const comments = createEntity<Comment, AddCommentAction>(EntityTypes.ADD_COMMENT)
const replies = createEntity<Reply, AddReplyAction>(EntityTypes.ADD_USER)

const topics = (state: KeyMap<Topic> = {}, action: any) => {
  const { type, payload } = action
  console.log('entities reducer')
  switch(type) {
    case HomeTypes.Topics:
    case MyTypes.Topics:
    case SolvedTypes.AnswerTopics:
    case SolvedTypes.QuestionTopics:
    case CollectTypes.Topics:
    case SharedTypes.Topics:
    case DraftTypes.Topics: {
      const { entities } = payload
      return {
        ...state,
        ...entities
      }
    }

    case EntityTypes.UpdateTopic:
    case EntityTypes.CreateTopic: {
      const { id } = payload
      return {
        ...state,
        [id]: payload
      }
    }

    default: {
      return state
    }
  }
}

export default combineReducers({users, topics, tags, comments, replies})
