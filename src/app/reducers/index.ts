import { ActionReducerMap, createSelector } from '@ngrx/store'
import { routerReducer } from '@ngrx/router-store'

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

export const getUrl = (state) => {
  return state.router.state.url
}

export const getPageState = createSelector(
  getState,
  getRouterData,
  (state, data) => {
    let pageState: PageState
    let { page, action } = data
    
    if (!page) {
      return
    }

    page = page.split('@')
    let type = page[0]
    pageState = state[type]

    if (page[1]) {
      type = page[1]
      pageState = pageState[type]
    }
    
    return {
      ...pageState,
      type,
      action
    }
  }
)

export const getLastID = createSelector(
  getTopics,
  getPageState,
  (topics, state) => {
    const { ids, action, type } = state
    const last = ids.length - 1
    const lastID = topics[ids[last]].updatedAt

    return {
      Action: action,
      lastID,
      type,
    }
  }
)
