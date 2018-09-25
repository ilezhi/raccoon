import {
  TopicTypes,
} from '../action/type'

const initState = {
  page: 1,
  total: 0,
  size: 2,
}

export const topicListCase = (state: PageState = {...initState, ids: []}, payload: any): PageState => {
  if (typeof payload === 'number') {
    return {
      ...state,
      page: payload
    }
  }

  let { ids } = state
  const { total, page, result: tids } = payload

  ids = [...ids]
  let unique = new Set(ids.concat(tids))
  ids = [...unique]

  return { ...state, page, total, ids }
}

export const topicPostCase = (state: PageState, payload: any): PageState => {
  if (!state) {
    return state
  }

  let { ids, total } = state
  const { result: id } = payload

  ids.unshift(id)
  total += 1

  return {
    ...state,
    total,
    ids
  }
}

export const topicUpdateCase = (state: PageState, payload: any): PageState =>{
  if (!state) {
    return state
  }

  let { ids } = state
  const { result: id } = payload

  ids = [...ids]
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

  let { ids, total } = state
  const { id } = payload
  const i = ids.indexOf(id)

  if (i !== -1) {
    ids.splice(i, 1)
    total -= 1
  }

  return {
    ...state,
    total,
    ids
  }
}
