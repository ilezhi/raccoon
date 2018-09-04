import * as topic from './topic.reducer'
import { ActionReducerMap } from '@ngrx/store';
import entities from './entities.reducer'

export interface StateTree {
  entities: {[key: string]: any}
}

export const reducers: ActionReducerMap<StateTree> = {
  entities
}
