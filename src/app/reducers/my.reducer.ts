import { createReducer } from '../tools/create-reducer'
import { MyTopicsAction } from '../action/my.action'
import {
  MyTypes,
  PageState,
} from '../types/action.type'

const reducer = createReducer<PageState, MyTopicsAction>(MyTypes.Topics)

export default reducer
