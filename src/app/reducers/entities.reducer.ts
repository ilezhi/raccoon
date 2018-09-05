import { combineReducers } from '@ngrx/store'

import { createEntity } from '../tools/create-reducer'
import { EntityTypes } from '../types/action.type'
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
const topics = createEntity<Topic, AddTopicAction>(EntityTypes.ADD_TOPIC)
const tags = createEntity<Tag, AddTagAction>(EntityTypes.ADD_TAG)
const comments = createEntity<Comment, AddCommentAction>(EntityTypes.ADD_COMMENT)
const replies = createEntity<Reply, AddReplyAction>(EntityTypes.ADD_USER)

export default combineReducers({users, topics, tags, comments, replies})
