import {
  TopicTypes,
} from '../action/type'

export const topicListCase = (state: PageState = {ids: [], done: false}, payload: any): PageState => {
  let { ids } = state
  const { result: tids, done } = payload

  let unique = new Set(ids.concat(tids))
  ids = [...unique]

  return { done, ids }
}

export const topicPostCase = (state: PageState, payload: any): PageState => {
  if (!state) {
    return state
  }

  let ids = [...state.ids]
  const { result: id } = payload

  ids.unshift(id)

  return {
    ...state,
    ids
  }
}

export const topicUpdateCase = (state: PageState, payload: any): PageState => {
  if (!state) {
    return state
  }

  let ids = [...state.ids]
  const { result: id } = payload

  const i = ids.indexOf(id)
  if (i !== -1) {
    ids.splice(i, 1)
  }

  ids.unshift(id)

  return {
    ...state,
    ids
  }
}

export const topicTrashCase = (state: PageState, payload: any): PageState => {
  if (!state) {
    return state
  }

  let ids = [...state.ids]
  const { id } = payload

  const i = state.ids.indexOf(id)
  if (i !== -1) {
    ids.splice(i, 1)
  }

  return {
    ...state,
    ids
  }
}
