import { Action } from '@ngrx/store'

import { TopicTypes } from './type'

export class Post implements Action {
  readonly type = TopicTypes.Post
  constructor(public payload: MySchema) {}
}

export class Update implements Action {
  readonly type = TopicTypes.Update
  constructor() {}
}

export class Detail implements Action {
  readonly type = TopicTypes.Detail
  constructor(public payload: MySchema) {}
}

export class Favor implements Action {
  readonly type = TopicTypes.Favor
  constructor(public payload: any) {}
}

export class Comments implements Action {
  readonly type = TopicTypes.Comments
  constructor(public payload: MySchema) {}
}

export class PostComment implements Action {
  readonly type = TopicTypes.PostComment
  constructor(public payload: Comment) {}
}

export class PostReply implements Action {
  readonly type = TopicTypes.PostReply
  constructor(public payload: Reply) {}
}

export class Like implements Action {
  readonly type = TopicTypes.Like
  constructor(public payload: any) {}
}
