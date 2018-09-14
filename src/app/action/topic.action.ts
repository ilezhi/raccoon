import { Action } from '@ngrx/store'

import { Topic } from 'src/app/models'
import { TopicTypes } from './type'
import { TopicParams } from 'src/app/types/api.params.type'

export class Topics implements Action {
  readonly type = TopicTypes.Topics
  constructor(public payload: any) {}
}

export class Post implements Action {
  readonly type = TopicTypes.Post
  constructor(public payload: TopicParams) {}
}

export class PostSuccess implements Action {
  readonly type = TopicTypes.PostSuccess
  constructor(public payload: Topic) {}
}

export class PostFailure implements Action {
  readonly type = TopicTypes.PostFailure
  constructor(public payload: any) {}
}

export class Update implements Action {
  readonly type = TopicTypes.Update
  constructor(public payload: Topic) {}
}

export class UpdateSuccess implements Action {
  readonly type = TopicTypes.UpdateSuccess
  constructor(public payload: Topic) {}
}

export class Detail implements Action {
  readonly type = TopicTypes.Topic
  constructor(public payload: number) {}
}
