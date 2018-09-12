import { Action } from "@ngrx/store"

import { EntityTypes } from '../types/action.type'
import {
  User,
  Topic,
  Tag,
  Comment,
  Reply,
} from '../models'

export class AddUserAction implements Action {
  readonly type = EntityTypes.ADD_USER
  constructor(public payload: {[id: number]: User}) {}
}

export class AddTopicAction implements Action {
  readonly type = EntityTypes.ADD_TOPIC
  constructor(public payload: {[id: number]: Topic}) {}
}

export class UpdateTopic implements Action {
  readonly type = EntityTypes.UpdateTopic
  constructor(public payload: {[id: number]: Topic}) {}
}

export class CreateTopic implements Action {
  readonly type = EntityTypes.CreateTopic
  constructor(public payload: {[key: string]: any}) {}
}

export class AddTagAction implements Action {
  readonly type = EntityTypes.ADD_TAG
  constructor(public payload: {[id: number]: Tag}) {}
}

export class AddCommentAction implements Action {
  readonly type = EntityTypes.ADD_COMMENT
  constructor(public payload: {[id: number]: Comment}) {}
}

export class AddReplyAction implements Action {
  readonly type = EntityTypes.ADD_REPLY
  constructor(public payload: {[id: number]: Reply}) {}
}
