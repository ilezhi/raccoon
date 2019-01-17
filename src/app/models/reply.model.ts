export interface Reply {
  id: number
  content: string
  commentID: number
  authorID: number
  receiverID: number
  totalGood: number
  [key: string]: any
}
