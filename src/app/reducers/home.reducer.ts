import { combineReducers } from '@ngrx/store'

import { createReducer } from '../tools/create-reducer'
import {
  HomeTypes,
  EntityTypes,
  PageState,
  defaultValue,
} from '../types/action.type'
import {
  AllTopicsAction,
  AwesomeTopicsAction,
  DeptTopicsAction,
  TeamTopicsAction,
} from '../action/home.action'

// const all = createReducer<PageState, AllTopicsAction>(HomeTypes.Topics)
const awesome = createReducer<PageState, AwesomeTopicsAction>(HomeTypes.AWESOME_TOPICS)
const dept = createReducer<PageState, DeptTopicsAction>(HomeTypes.DEPT_TOPICS)
const team = createReducer<PageState, TeamTopicsAction>(HomeTypes.TEAM_TOPICS)

const all = (state: PageState = defaultValue, action) => {
  const { type, payload } = action
  console.log('all reducer')

  switch(type) {
    case HomeTypes.Topics: {
      let { ids } = state
      const { total, page, tids } = payload
      let unique = new Set(ids.concat(tids))
      ids = [...unique]

      return {
        ...state,
        total,
        page,
        ids,
      }
    }

    case EntityTypes.UpdateTopic: {
      let { ids } = state
      const { id } = payload
      const i = ids.indexOf(id)

      if (i !== -1) {
        // 已存在, 则先删除
        ids.splice(i, 1)
      }
      ids.unshift(id)
      return {
        ...state,
        ids: [...ids]
      }
    }

    case EntityTypes.CreateTopic: {

      let { ids = [], total = 0 } = state
      const { id } = payload

      ids.unshift(id)
      total += 1

      return {
        ...state,
        total,
        ids: [...ids],
      }
    }

    case HomeTypes.Filter: {
      return {
        ...state,
        filter: payload
      }
    }

    default: {
      return state
    }
  }
}



const fetching = (state, action) => {
  switch(action.type) {
    case AllTopicsAction:
    case AwesomeTopicsAction:
    case DeptTopicsAction:
    case TeamTopicsAction: {
      return true
    }

    default: {
      return false
    }
  }
}

export const getAll = (state: any) => {
  const { entities: { topics }, home: { all } } = state
  const { ids, page, size = 50 } = all
  const start = (page - 1) * size
  const end = page * size
  let t = ids.slice(start, end).map(id => topics[id])

  return {
    ...all,
    topics: t
  }
}

export default combineReducers({all, awesome, dept, team, fetching})
