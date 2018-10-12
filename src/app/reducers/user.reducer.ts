import { combineReducers, createSelector } from '@ngrx/store'

import { UserTypes, TopicTypes } from '../action/type'

const info = (state = {}, action: Action) => {
  const { type, payload } = action

  switch(type) {
    case UserTypes.LoginSuccess: {
      return payload
    }

    default: {
      return state
    }
  }
}

const category = (state = [], action: Action) => {
  const { type, payload } = action
  
  switch(type) {
    case UserTypes.InfoSuccess: {
      return [...payload.categories]
    }

    default: {
      return state
    }
  }
}

const tags = (state = [], action: Action) => {
  const { type, payload } = action

  switch(type) {
    case UserTypes.InfoSuccess: {
      return [ ...payload.tags ]
    }

    case TopicTypes.PostSuccess:
    case TopicTypes.UpdateSuccess: {
      const { tags } = payload.entities
      const tids = Object.keys(tags)

      const unique = state.map(tag => {
        const i = tids.indexOf(tag.id + '')
        if (i !== -1) {
          tids.splice(i, 1)
          const count = tag.count + 1
          return {
            ...tag,
            count
          }
        } else {
          return { ...tag }
        }
      })

      tids.forEach(id => {
        const tag = tags[id]
        tag.count = 1
        unique.push(tag)
      })

      return unique
    }

    default: {
      return state
    }
  }
}

const loading = (state = false, action: Action) => {
  const { type } = action

  switch(type) {
    case UserTypes.Login: {
      return true
    }

    case UserTypes.LoginSuccess:
    case UserTypes.LoginFailure: {
      return false
    }

    default: {
      return state
    }
  }
}

export const getLoading = (state) => {
  return state.user.loading
}

export const getTags = (state) => {
  return state.user.tags
}

export const getCategory = state => {
  return state.user.category
}

export default combineReducers({info, category, tags, loading})
