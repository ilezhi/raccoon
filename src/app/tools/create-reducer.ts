import {
  KeyMap,
  Action,
} from '../types/action.type'

export function createReducer<S, A extends Action>(condition) {
  return function page(state: KeyMap<S> = {}, action: A): KeyMap<S> {
    const { type, payload } = action
    switch(type) {
      case condition: {
        return {...payload}
      }

      default: {
        return state
      }
    }
  }
}

export function createEntity<S, A extends Action>(condition) {
  return function entity(state: KeyMap<S> = {}, action: A): KeyMap<S> {
    const { type, payload } = action
    switch(type) {
      case condition: {
        return { ...state, ...payload}
      }

      default: {
        return state
      }
    }
  }
}

export function createKeyReducer<S, A extends Action>(condition) {
  return function list(state: KeyMap<S> = {}, action: A): KeyMap<S> {
    const { type, payload } = action
    switch(type) {
      case condition: {
        const { id, ...rest } = payload
        return { ...state, [id]: rest }
      }

      default: {
        return state
      }
    }
  }
}
