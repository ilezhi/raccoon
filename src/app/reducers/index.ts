import { ActionReducerMap, createSelector } from '@ngrx/store'
import { routerReducer } from '@ngrx/router-store'

import * as util from 'src/app/tools/util'

import entities, { getTopics } from './entities.reducer'
import homeReducer from './home.reducer'
import myReducer from './my.reducer'
import solvedReducer from './solved.reducer'
import collectionReducer from './collection.reducer'
import sharedReducer from './shared.reducer'
import draftReducer from './draft.reducer'
import tagReducer from './tag.reducer'
// import projectReducer from './project.reducer'
import global from './global.reducer'

export const appReducer: ActionReducerMap<any, any> = {
  entities,
  global,
  router: routerReducer
}

export {
  homeReducer,
  myReducer,
  solvedReducer,
  collectionReducer,
  sharedReducer,
  draftReducer,
  tagReducer,
  // projectReducer,
}

export const getState = (state) => {
  return state
}

export const getRouterData = (state) => {
  let route = state.router.state.root
  while (route.firstChild) {
    route = route.firstChild
  }

  return route.data
}

export const getLastID = (page) => createSelector(
  getState,
  getTopics,
  getRouterData,
  (state, topics, data) => {
    let { page: p, action } = data

    let pageState: PageState
    if (p.includes('@')) {
      p = p.split('@')
      pageState = state[p[0]][p[1]]
    } else {
      pageState = state[p]
    }

    const { size, ids, total } = pageState
    const count = page * size
    let len = ids.length
    let lastID
    // 需要的数据不存在
    if (count > len && total > len) {
      const id = ids[count - size - 1]
      lastID = topics[id].updatedAt
    }

    return {
      Action: action,
      lastID
    }
  }
)

export const filter = (state) => {
  let { page } = util.getRouterData(state.router.state)

  let obj
  if (page.includes('@')) {
    page = page.split('@')
    obj = state[page[0]][page[1]]
  } else {
    obj = state[page]
  }

  if (!obj) {
    return
  }

  const { page: n, size, total } = obj

  return {
    page: n,
    size,
    total
  }
}
