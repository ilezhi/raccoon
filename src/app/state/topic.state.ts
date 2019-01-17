import { Action } from '@ngrx/store'

import { Topic } from '../models/topic.model'

export enum TopicActionTypes {
  GetTopics = 'Get Topics'
}

export class GetTopics implements Action {
  readonly type = TopicActionTypes.GetTopics

  constructor(public payload: Array<Topic>) {}
}
