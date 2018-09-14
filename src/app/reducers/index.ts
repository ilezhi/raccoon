import { ActionReducerMap } from '@ngrx/store'

import entities from './entities.reducer'
import homeReducer from './home.reducer'
// import myReducer from './my.reducer'
// import solvedReducer from './solved.reducer'
// import collectionReducer from './collection.reducer'
// import sharedReducer from './shared.reducer'
// import draftReducer from './draft.reducer'
// import tagReducer from './tag.reducer'
// import projectReducer from './project.reducer'

export const appReducer: ActionReducerMap<any, any> = {
  entities,
}

export {
  homeReducer,
  // myReducer,
  // solvedReducer,
  // collectionReducer,
  // sharedReducer,
  // draftReducer,
  // tagReducer,
  // projectReducer,
}


export const getFull = (state) => {
  return state
}
