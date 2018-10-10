declare interface PageState {
  ids: number[]
  [key: string]: any
}

declare interface DState {
  [id: number]: PageState
}

declare interface State {
  [key: string]: PageState
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

declare interface LoginForm {
  email: string
  password: string
}
