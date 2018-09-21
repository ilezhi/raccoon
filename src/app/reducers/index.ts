import { ActionReducerMap } from '@ngrx/store'
import { routerReducer } from '@ngrx/router-store'

import * as util from 'src/app/tools/util'

import entities from './entities.reducer'
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

export const getFull = (state) => {
  return state
}

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
