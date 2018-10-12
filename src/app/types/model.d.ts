declare interface Topic {
  id: number
  title: string
  content: string
  tags: number[]
  view: number
  top: boolean
  awesome: boolean
  shared: boolean
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
