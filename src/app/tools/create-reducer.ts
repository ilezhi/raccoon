import {
  TopicTypes,
} from '../action/type'

export const topicListCase = (state: PageState, payload: any): PageState => {
  let { ids } = state
  const { total, page, tids } = payload

  ids = [...ids]
  let unique = new Set(ids.concat(tids))
  ids = [...unique]

  return { ...state, page, total, ids }
}

export const topicPostCase = (state: PageState, payload: any): PageState => {
  let { ids, total } = state
  const { id } = payload

  ids.unshift(id)
  total += 1

  return {
    ...state,
    total,
    ids
  }
}

export const topicUpdateCase = (state: PageState, payload: any): PageState =>{
  let { ids } = state
  const { id } = payload

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
