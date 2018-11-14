export enum TopicTypes {
  Detail = '[Detail page] topic',

  Post = '[Post page] topic',

  Update = '[Edit page] topic',

  Favor = '[Detail page] favor',
  Like = '[Detail page] like',

  Comments = '[Detail page] comments',
  PostComment = '[Detail page] post comment',
  PostReply = '[Detail page] post reply',

  Top = '[List page] top',
  Awesome = '[List page] awesome',
}

export enum HomeTypes {
  All = '[All page] topics',

  Awesome = '[Awesome page] topics',

  Dept = '[Dept page] topics',

  Team = '[Team page] topics',
}

export enum MyTypes {
  Topics = '[My page] topics',
}

export enum SolvedTypes {
  QTopics = '[Solved Question page] topics',

  ATopics = '[Solved Answer page] topics',
}

export enum CollectTypes {
  Topics = '[Collection page] topics',
}

export enum SharedTypes {
  Topics = '[Shared page] topics',
}

export enum DraftTypes {
  Topics = '[Draft page] topics',

  Topic = '[Draft page] topic',

  Post = '[Draft page] post topic',

  Update = '[Draft page] update topic',

  Trash = '[Draft page] trash topic',
}

export enum ProjectTypes {
  Topics = '[Project page] topics',
}

export enum TagTypes {
  Topics = '[Tag page] topics',

  Post  = '[Tag Create] post tag',
}

export enum UserTypes {
  Login = '[Login page] login',

  Info = '[Home page] info',

  PostCategory = '[Detail page] post category',
}

export enum SocketTypes {
  PostTopic = '[RT post] topic',
  UpdateTopic = '[RT put] topic',
  TrashTopic = '[RT trash] topic',

  Comment = '[RT post] comment',
  Reply = '[RT post] reply',

  Like = '[RT like] topic',
  Favor = '[RT favor] topic',

  Top = '[RT top] top',
  Awesome = '[RT awesome] topic',
}
