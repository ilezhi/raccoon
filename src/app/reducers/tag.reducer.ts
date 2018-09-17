import { TagTypes, TopicTypes } from '../action/type'

const tag = (state: DState = {}, action: Action): DState => {
  const { type, payload } = action

  switch(type) {
    case TagTypes.TopicsSuccess: {
      const { tagID, total, page, tids } = payload
      let { ids, ...rest } = state[tagID]
      let unique = new Set(ids.concat(tids))
      ids = [...unique]

      return {
        ...state,
        [tagID]: {
          ...rest,
          page,
          total,
          ids,
        }
      }
    }

    case TopicTypes.PostSuccess:
    case TopicTypes.UpdateSuccess: {
      const { tags, id } = payload
      let st = JSON.parse(JSON.stringify(state))

      tags.forEach(tid => {
        let topics = st[tid]
        if (topics) {
          const { ids, ...rest } = topics
          const i = ids.indexOf(id)

          if (i === -1) {
            rest.total += 1
          } else {
            ids.splice(i, 1)
          }
          
          ids.unshift(id)
        } else {
          st[tid] = {
            page: 1,
            total: 1,
            size: 50,
            ids: [id]
          }
        }
      })

      return st
    }

    case TopicTypes.TrashSuccess: {
      const { tags, id } = payload
      let st = JSON.parse(JSON.stringify(state))

      tags.forEach(tid => {
        let { ids } = st[tid]
        const i = ids.indexOf(id)

        if (i !== -1) {
          ids.splice(i, 1)
        }
      })

      return st
    }

    default: {
      return state
    }
  }
}

export default tag
