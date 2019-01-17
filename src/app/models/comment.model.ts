export interface Comment {
  id: number
  content: string
  authorID: number
  topicID: number
  totalGood: number
  [key: string]: any
}
