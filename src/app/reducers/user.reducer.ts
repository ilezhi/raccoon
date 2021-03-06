import { combineReducers, createSelector } from '@ngrx/store'

import { UserTypes, TopicTypes } from '../action/type'

const info = (state = {}, action: Action) => {
  const { type, payload } = action

  switch (type) {
    case UserTypes.Login: {
      return payload
    }

    case UserTypes.Logout: {
      return {}
    }

    default: {
      return state
    }
  }
}

const category = (state = [], action: Action) => {
  const { type, payload } = action

  switch (type) {
    case UserTypes.Info: {
      return [...payload.categories]
    }

    case UserTypes.PostCategory: {
      return [payload, ...state]
    }

    case TopicTypes.Favor: {
      let categories = state.map(item => {
        if (item.id === payload.categoryID) {
          if (payload.isFavor) {
            item.count += 1
          } else {
            item.count -= 1
          }
        }

        return {
          ...item
        }
      })

      return categories
    }

    default: {
      return state
    }
  }
}

const tags = (state = [], action: Action) => {
  const { type, payload } = action

  switch (type) {
    case UserTypes.Info: {
      return [ ...payload.tags ]
    }

    case TopicTypes.Post: {
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

    case TopicTypes.Update: {
      const { oldTags, entities: { tags } } = payload
      let minus: number[] = []
      let oid: number[] = []
      let plus: string[] = Object.keys(tags)

      oldTags.forEach(t => {
        const id = t.id
        oid.push(id)
        const i = plus.indexOf(id + '')
        if (i === -1) {
          minus.push(id)
        } else {
          plus.splice(i, 1)
        }
      })

      let unique = []
      state.reduce((arr, t) => {
        let tag = { ...t }
        if (minus.includes(tag.id)) {
          tag.count -= 1
        }

        const i = plus.indexOf(tag.id + '')
        if (i !== -1) {
          tag.count += 1
          plus.splice(i, 1)
        }

        arr.push(tag)
        return arr
      }, unique)


      if (plus.length === 0) {
        return unique
      }

      plus.forEach(id => {
        let tag = {...tags[id]}
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

export const getInfo = state => {
  const { user = {} } = state
  return user.info
}

export const getTags = (state) => {
  const { user = {} } = state
  return user.tags || []
}

export const getCategories = state => {
  const { user = {} } = state
  return user.category || []
}

export const getCategoryByName = (name: string) => createSelector(
  getCategories,
  categories => categories.find(c => {
    return c.name.toLowerCase() === name.toLowerCase()
  })
)

export const getTagByName = (name: string) => createSelector(
  getTags,
  tags => tags.find(c => {
    return c.name.toLowerCase() === name.toLowerCase()
  })
)

export default combineReducers({info, category, tags})
