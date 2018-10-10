import { combineReducers } from '@ngrx/store'

import { UserTypes } from '../action/type'

const info = (state, action: Action) => {
  const { type, payload } = action

  switch(type) {
    case UserTypes.LoginSuccess: {
      return {
        ...payload.user
      }
    }

    default: {
      return state
    }
  }
}

const category = (state, action: Action) => {
  const { type, payload } = action
  
  switch(type) {
    case UserTypes.LoginSuccess: {
      return [...payload.info.categories]
    }

    default: {
      return state
    }
  }
}

const tags = (state, action: Action) => {
  const { type, payload } = action

  switch(type) {
    case UserTypes.LoginSuccess: {
      return [ ...payload.info.tags ]
    }

    default: {
      return state
    }
  }
}

export default combineReducers({info, category, tags})
