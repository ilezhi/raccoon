import { createReducer } from '../tools/create-reducer'
import { SharedTopicsAction } from '../action/shared.action'
import {
  SharedTypes,
  PageState,
} from '../types/action.type'

const reducer = createReducer<PageState, SharedTopicsAction>(SharedTypes.TOPICS)

export default reducer
