import { Action } from '@ngrx/store'

import { TopicTypes } from './type'

export class Topics implements Action {
  readonly type = TopicTypes.Topics
  constructor(public payload?: any) {}
}

export class TopicsSuccess implements Action {
  readonly type = TopicTypes.TopicsSuccess
  constructor(public payload: MySchema) {}
}

export class TopicsFailure implements Action {
  readonly type = TopicTypes.TopicsFailure
  constructor(public payload: any) {}
}

export class Post implements Action {
  readonly type = TopicTypes.Post
  constructor(public payload: MySchema) {}
}

export class PostSuccess implements Action {
  readonly type = TopicTypes.PostSuccess
  constructor(public payload: MySchema) {}
}

export class PostFailure implements Action {
  readonly type = TopicTypes.PostFailure
  constructor(public payload: any) {}
}

export class Update implements Action {
  readonly type = TopicTypes.Update
  constructor() {}
}

export class UpdateSuccess implements Action {
  readonly type = TopicTypes.UpdateSuccess
  constructor(public payload: MySchema) {}
}

export class Detail implements Action {
  readonly type = TopicTypes.Detail
  constructor(public payload: number) {}
}

export class DetailSuccess implements Action {
  readonly type = TopicTypes.DetailSuccess
  constructor(public payload: any) {}
}

export class FavorSuccess implements Action {
  readonly type = TopicTypes.FavorSuccess
  constructor(public payload: any) {}
}

export class Comments implements Action {
  readonly type = TopicTypes.Comments
  constructor(public payload: number) {}
}

export class CommentsSuccess implements Action {
  readonly type = TopicTypes.CommentsSuccess
  constructor(public payload: any) {}
}

export class PostComtSuccess implements Action {
  readonly type = TopicTypes.PostCommentSuccess
  constructor(public payload: Comment) {}
}

export class PostReplySuccess implements Action {
  readonly type = TopicTypes.PostReplySuccess
  constructor(public payload: Reply) {}
}

export class LikeSuccess implements Action {
  readonly type = TopicTypes.LikeSuccess
  constructor(public payload: any) {}
}
