import { PageState, TagTypes } from '../types/action.type'
import { TagTopicsAction } from '../action/tag.action'

import { createKeyReducer } from '../tools/create-reducer'

const reducer = createKeyReducer<PageState, TagTopicsAction>(TagTypes.Topics)

export default reducer
