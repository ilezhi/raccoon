import { createReducer } from '../tools/create-reducer'
import { DraftTopicsAction } from '../action/draft.action'
import {
  DraftTypes,
  PageState,
} from '../types/action.type'

const reducer = createReducer<PageState, DraftTopicsAction>(DraftTypes.TOPICS)

export default reducer
