import { Action } from '@ngrx/store'

import { SocketTypes } from './type'

export class PostTopic implements Action {
  readonly type = SocketTypes.PostTopic
  constructor(public payload: MySchema) {}
}

export class UpdateTopic implements Action {
  readonly type = SocketTypes.UpdateTopic
  constructor(public payload: MySchema) {}
}

export class TrashTopic implements Action {
  readonly type = SocketTypes.TrashTopic
  constructor(public payload: MySchema) {}
}

export class Comment implements Action {
  readonly type = SocketTypes.Comment
  constructor(public payload: MySchema) {}
}

export class Reply implements Action {
  readonly type = SocketTypes.Reply
  constructor(public payload: MySchema) {}
}

export class Favor implements Action {
  readonly type = SocketTypes.Favor
  constructor(public payload: any) {}
}

export class Like implements Action {
  readonly type = SocketTypes.Like
  constructor(public payload: any) {}
}

export class Top implements Action {
  readonly type = SocketTypes.Top
  constructor(public payload: MySchema) {}
}

export class Awesome implements Action {
  readonly type = SocketTypes.Awesome
  constructor(public payload: MySchema) {}
}

export class Answer implements Action {
  readonly type = SocketTypes.Answer
  constructor(public payload: Topic) {}
}
