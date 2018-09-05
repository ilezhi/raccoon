import { PageState, ProjectTypes } from '../types/action.type'
import { ProjectTopicsAction } from '../action/project.action'

import { createKeyReducer } from '../tools/create-reducer'

const reducer = createKeyReducer<PageState, ProjectTopicsAction>(ProjectTypes.TOPICS)

export default reducer
