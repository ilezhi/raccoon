declare interface PageState {
  page: number
  total: number
  size: number
  ids: number[]
}

declare interface Action {
  type: string
  payload: any
}

declare interface KeyMap {
  [id: number]: {[key: string]: any}
}
