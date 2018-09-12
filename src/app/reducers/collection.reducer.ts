import { reduceState } from '@ngrx/store'
import { createReducer } from '../tools/create-reducer'
import { CollectionTopicsAction } from '../action/collection.action'
import {
  CollectTypes,
  PageState,
} from '../types/action.type'

const reducer = createReducer<PageState, CollectionTopicsAction>(CollectTypes.Topics)

export default reducer
