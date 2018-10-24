export enum TopicTypes {
  Topics = '[Topic List Page] list',
  TopicsSuccess = '[Topic/api] list',
  TopicsFailure = '[Topic/list] error',

  Detail = '[Topic Detail Page] detail',
  DetailSuccess = '[Topic/api] detail',

  Post = '[Post Topic Page] post topic',
  PostSuccess = '[Topic/api] success post topic',
  PostFailure = '[Topic/api] fail post topic',

  Update = '[Edit Topic Page] update topic',
  UpdateSuccess = '[Topic/api] update topic success',

  Trash = '[Trash Topic Page] trash topic',
  TrashSuccess = '[Topic] trash topic success',

  FavorSuccess = '[Topic/api] favor',

  Comments = '[Topic/Comments] comments',
  CommentsSuccess = '[Topic/api] comments',
  PostCommentSuccess = '[Topic/api] post comment',
  PostReplySuccess = '[Topic/api] post reply'
}

export enum HomeTypes {
  All = '[All/api] topics',
  AllSuccess = '[All Page] topics',

  Awesome = '[Awesome Page] topics',
  AwesomeSuccess = '[Awesome/api] topics',

  Dept = '[Dept Page] topics',
  DeptSuccess = '[Dept/api] topics',

  Team = '[Team Page] topics',
  TeamSuccess = '[Team/api] topics'
}

export enum MyTypes {
  Topics = '[My Page] topics',
  TopicsSuccess = '[My/api] topics',
}

export enum SolvedTypes {
  QTopics = '[Solved Question Page] topics',
  QTopicsSuccess = '[Question/api] topics',

  ATopics = '[Solved Answer Page] topics',
  ATopicsSuccess = '[Answer/api] topics',
}

export enum CollectTypes {
  Topics = '[Collection Page] topics',
  TopicsSuccess = '[Collection/api] topics',

  // 收藏帖子/取消收藏
  Collect = '[Collect/api] topic',
}

export enum SharedTypes {
  Topics = '[Shared Page] topics',
  TopicsSuccess = '[Shared/api] topics',
}

export enum DraftTypes {
  Topics = '[Draft Page] topics',
  TopicsSuccess = '[Draft/api] topics',

  Topic = '[Draft Page] topic',
  TopicSuccess = '[Draft/api] topic',

  Post = '[Draft Page] post topic',
  PostSuccess = '[Draft/api] post topic',

  Update = '[Draft Page] update topic',
  UpdateSuccess = '[Draft/api] update topic',

  Trash = '[Draft Page] trash topic',
  TrashSuccess = '[Draft/api] trash topic',
}

export enum ProjectTypes {
  Topics = '[Project] project topics',
}

export enum TagTypes {
  Topics = '[Tag Page] topics',
  TopicsSuccess = '[Tag/api] topics',

  Post  = '[Tag Create] post tag',
  PostSuccess = '[Tag/api] post tag',
}

export enum UserTypes {
  Login = '[Login Page] login',
  LoginSuccess = '[Login/api] success',
  LoginFailure = '[Login/api] failure',

  Info = '[User/Info] info',
  InfoSuccess = '[User/api] info',
  InfoFailure = '[User/api] failure',

  Category = '[Category/api] new',
  CategorySuccess = '[Category/api] success',
  CategoryFailure = '[Category/api] failure'
}
