declare interface Res {
  code: number
  msg: string
  data: any
}

declare interface TopicParams {
  title: string
  content: string
  tags: number[]
  shared: boolean
}
