declare interface Topic {
  id: number
  title: string
  content: string
  tags: number[]
  view: number
  top: boolean
  awesome: boolean
  shared: boolean
  isFull: boolean
  [key: string]: any
}

declare interface TopicData {
  topic: Topic
  [key: string]: any
}

declare interface Tag {
  id: number
  name: string
  description?: string
  authorID?: number
  [key: string]: any
}

declare interface Category {
  id: number
  name: string
  userID: number
  count: number
  [key: string]: any
}

declare interface Entities<T> {
  [id: number]: T
}

declare interface Comment {
  id: number
  content: string
  topicID: number
  authorID: number
  nickname: string
  avatar: string
  updatedAt: number
  replies: Array<Reply>
  title: string
  rid: number
  [key: string]: any
}

declare interface Reply {
  [key: string]: any
}

declare interface User {
  [key: string]: any
}
