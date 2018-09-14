export enum TopicTypes {
  Topics = '[Topic List Page] list',
  TopicsSuccess = '[Topic/api] list',

  Topic = '[Topic Detail Page] detail',
  TopicSuccess = '[Topic/api] detail',

  Post = '[Post Topic Page] post topic',
  PostSuccess = '[Topic/api] success post topic',
  PostFailure = '[Topic/api] fail post topic',

  Update = '[Edit Topic Page] update topic',
  UpdateSuccess = '[Topic/api] update topic success',

  Trash = '[Trash Topic Page] trash topic',
  TrashSuccess = '[Topic] trash topic success',
}

export enum HomeTypes {
  All = '[All/api] all topic',
  AllSuccess = '[All Page] all topic',

  Awesome = '[Awesome Page] awesome topic',
  AwesomeSuccess = '[Awesome/api] awesome topic',

  Dept = '[Dept Page] dept topic',
  DeptSuccess = '[Dept/api] dept topic',

  Team = '[Team Page] team topic',
  TeamSuccess = '[Team/api] team topic'
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
