declare interface PageState {
  page: number
  total: number
  size: number
  ids: number[]
}

declare interface DState {
  [id: number]: PageState
}

declare interface Action {
  type: string
  payload: any
}

declare interface KeyMap {
  [id: number]: {[key: string]: any}
}

declare interface MySchema {
  entities: {[key: string]: any}
  result: any
}
