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
  size: number
  total: number
  filter: string
}

export interface ListState extends PageState {
  id: number
}

export enum HomeTypes {
  TOPICS = '[Home] all topics',
  AWESOME_TOPICS = '[Home] awesome topics',
  DEPT_TOPICS = '[Home] dept topics',
  TEAM_TOPICS = '[Home] teamtopics',
}

export enum EntityTypes {
  ADD_USER = '[Entity] add User',
  ADD_TOPIC = '[Entity] add Topic',
  ADD_TAG = '[Entity] add Tag',
  ADD_COMMENT = '[Entity] add Comment',
  ADD_REPLY = '[Entity] add Reply',
}

export enum MyTypes {
  TOPICS = '[My] get topics',
}

export enum SolvedTypes {
  QUESTION_TOPICS = '[Solved] question topics',
  ANSWER_TOPICS = '[Solved] anwser topics',
}

export enum CollectTypes {
  TOPICS = '[Collection] collection topics',
}

export enum SharedTypes {
  TOPICS = '[Shared] shared topics',
}

export enum DraftTypes {
  TOPICS = '[Draft] draft topics',
}

export enum ProjectTypes {
  TOPICS = '[Project] project topics',
}

export enum TagTypes {
  TOPICS = '[Tag] tag topics',
}
