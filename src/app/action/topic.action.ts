import { Action } from "@ngrx/store";

import { Topic } from '../models/topic.model'

export class GetTopics implements Action {
  readonly type = 'FETCH_TOPICS';

  constructor(public payload: Array<Topic>) {}
}

export class CreateTopic implements Action {
  readonly type = 'CREATE_TOPIC';

  constructor(public payload: Topic) {}
}

export type Actions
  = GetTopics
  | CreateTopic;
