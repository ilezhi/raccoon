export interface State {
  entities: {[key: string]: any}
  home?: {[key: string]: any}
}

export interface KeyMap<T> {
  [key: number]: T
}

export interface Action {
  type: string
  payload: any
}

export interface PageState {
  time: number
  page: number
  total: number
  ids: number[]
  filter: string
}

export const defaultValue = {
  time: 0,
  page: 1,
  total: 0,
  ids: [],
  filter: ''
}

export interface ListState extends PageState {
  id: number
}

export enum HomeTypes {
  Topics = '[Home] all topics',
  AWESOME_TOPICS = '[Home] awesome topics',
  DEPT_TOPICS = '[Home] dept topics',
  TEAM_TOPICS = '[Home] team topics',

  Filter = '[Home] filter topics',
}

export enum EntityTypes {
  ADD_USER = '[Entity] add User',
  ADD_TOPIC = '[Entity] add Topic',
  ADD_TAG = '[Entity] add Tag',
  ADD_COMMENT = '[Entity] add Comment',
  ADD_REPLY = '[Entity] add Reply',

  UpdateTopic = '[Entity] update topic',
  CreateTopic = '[Entity] create topic',
}

export enum MyTypes {
  Topics = '[My] my topics',
}

export enum SolvedTypes {
  QuestionTopics = '[Solved] question topics',
  AnswerTopics = '[Solved] anwser topics',
}

export enum CollectTypes {
  Topics = '[Collection] collection topics',
}

export enum SharedTypes {
  Topics = '[Shared] shared topics',
}

export enum DraftTypes {
  Topics = '[Draft] draft topics',
}

export enum ProjectTypes {
  Topics = '[Project] project topics',
}

export enum TagTypes {
  Topics = '[Tag] tag topics',  // 此标签下的topic
  SearchTags = '[Tag] search tags',
  Tags = '[Tag] tag list'
}
