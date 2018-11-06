import { Action } from '@ngrx/store'

import { SocketTypes } from './type'

export class PostTopic implements Action {
  readonly type = SocketTypes.PostTopic
  constructor(public payload: MySchema) {}
}

export class PutTopic implements Action {
  readonly type = SocketTypes.PutTopic
  constructor(public payload: MySchema) {}
}

export class Comment implements Action {
  readonly type = SocketTypes.Comment
  constructor(public payload: Comment) {}
}

export class Reply implements Action {
  readonly type = SocketTypes.Reply
  constructor(public payload: Reply) {}
}

export class Favor implements Action {
  readonly type = SocketTypes.Favor
  constructor(public payload: any) {}
}

export class Like implements Action {
  readonly type = SocketTypes.Like
  constructor(public payload: any) {}
}
