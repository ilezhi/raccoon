import { combineReducers, createSelector } from '@ngrx/store'

import * as moment from 'moment'

import {
  TopicTypes,
  DraftTypes,
  HomeTypes,
  MyTypes,
  SolvedTypes,
  TagTypes,
  SharedTypes,
  SocketTypes,
} from '../action/type'

const topics = (state: KeyMap = {}, action: Action): KeyMap => {
  const { type, payload } = action

  switch(type) {
    case HomeTypes.All:
    case HomeTypes.Dept:
    case HomeTypes.Team:
    case HomeTypes.Awesome:
    case MyTypes.Topics:
    case SolvedTypes.QTopics:
    case SolvedTypes.ATopics:
    case SharedTypes.Topics: {

      const { topics } = payload.entities
      const obj = {}

      for (const id in topics) {
        const topic = state[id]
        if (!topic || !topic.isFull) {
          obj[id] = topics[id]
        }
      }

      return {
        ...state,
        ...obj
      }
    }

    case SocketTypes.PostTopic:
    case TopicTypes.Post: {
      const { topics } = payload.entities
      return {
        ...state,
        ...topics
      }
    }

    case TopicTypes.Detail: {
      const { topics } = payload.entities
      const obj = {}
      for (const key in topics) {
        let t = topics[key]
        const ot = state[key]
        t.isFull = true
        t.lastNickname = ot.lastNickname
        t.lastAvatar = ot.lastAvatar

        obj[key] = t
      }

      return {
        ...state,
        ...obj
      }
    }

    case TopicTypes.Update: {
      const { topics } = payload.entities
      const obj = {}
      for (const key in topics) {
        let t = topics[key]
        const ot = { ...state[key] }
        ot.tags = t.tags
        ot.content = t.content
        ot.activeAt = t.activeAt
        ot.shared = t.shared

        obj[key] = ot
      }

      return {
        ...state,
        ...obj
      }
    }

    case TopicTypes.Comments: {
      const { result, entities: { comments } } = payload
      if (!result.length) {
        return state
      }

      const cid = result[0]
      const topicID = comments[cid].topicID
      let topic = { ...state[topicID] }
      topic.comments = result
      return {
        ...state,
        [topicID]: topic
      }
    }

    case TopicTypes.PostComment: {
      const { topicID, id, avatar, nickname, createdAt } = payload
      const topic = { ...state[topicID] }
      if (topic.comments) {
        topic.comments.push(id)
      } else {
        topic.comments = [id]
      }

      topic.comtCount += 1
      topic.lastAvatar = avatar
      topic.lastNickname = nickname
      topic.activeAt = moment(createdAt).unix()
      return {
        ...state,
        [topicID]: topic
      }
    }

    case TopicTypes.Favor: {
      const { topicID: id, isFavor, categoryID } = payload
      let topic = {...state[id]}

      if (!topic.isFull) {
        return state
      }

      topic.isFavor = isFavor

      if (isFavor) {
        topic.favorCount += 1
        topic.categoryID = categoryID
      } else {
        topic.favorCount -= 1
        topic.categoryID = 0
      }

      return {
        ...state,
        [id]: topic,
      }
    }

    case SocketTypes.Favor: {
      const { id, isFavor } = payload
      let topic = {...state[id]}

      if (!topic || !topic.isFull) {
        return state
      }

      if (isFavor) {
        topic.favorCount += 1
      } else {
        topic.favorCount -= 1
      }

      return {
        ...state,
        [id]: topic
      }
    }

    case TopicTypes.Like: {
      const { topicID: id, type, isLike} = payload
      if (type !== 'topic') {
        return state
      }

      const topic = {...state[id]}

      // 只有获取过详情才会有此信息
      if (!topic.isFull) {
        return state
      }

      topic.isLike = isLike
      if (isLike) {
        topic.likeCount += 1
      } else {
        topic.likeCount -= 1
      }

      return {
        ...state,
        [id]: topic
      }
    }

    case SocketTypes.Like: {
      const { id, type, isLike } = payload
      if (type !== 'topic') {
        return state
      }

      let topic = {...state[id]}
      if (!topic || !topic.isFull) {
        return state
      }

      if (isLike) {
        topic.likeCount += 1
      } else {
        topic.likeCount -= 1
      }

      return {
        ...state,
        [id]: topic
      }      
    }

    default: {
      return state
    }
  }
}

const draft = (state: KeyMap = {}, action: Action): KeyMap => {
  const { type, payload } = action

  switch(type) {
    case DraftTypes.Topics: {
      const { entities } = payload
      return {
        ...state,
        ...entities
      }
    }

    case DraftTypes.Topic:
    case DraftTypes.Post:
    case DraftTypes.Update: {
      const { id } = payload
      return {
        ...state,
        [id]: payload
      }
    }

    case DraftTypes.Trash: {
      const { id } = payload
      delete state[id]
      return {
        ...state
      }
    }

    default: {
      return state
    }
  }
}

const tags = (state: KeyMap = {}, action: Action): KeyMap => {
  const { type, payload } = action

  if (!payload) {
    return state
  }

  switch(type) {
    case HomeTypes.All:
    case HomeTypes.Dept:
    case HomeTypes.Team:
    case HomeTypes.Awesome:
    case TopicTypes.Detail:
    case TopicTypes.Post:
    case TopicTypes.Update:
    case SocketTypes.PostTopic: {
      const { tags } = payload.entities
      
      if (!tags) {
        return state
      }

      const ids = Object.keys(tags).filter(id => !state[id])
      if (!ids.length) {
        return state
      }

      const newTags = ids.reduce((obj, id) => {
        obj[id] = tags[id]
        return obj
      }, {})

      return {
        ...state,
        ...newTags
      }
    }

    case TagTypes.Post: {
      const { id } = payload

      if (state[id]) {
        return state
      }

      return {
        ...state,
        [id]: payload 
      }
    }

    default: {
      return state
    }
  }
}

const comments = (state: KeyMap = {}, action) => {
  const { type, payload } = action
  switch(type) {
    case TopicTypes.Comments: {
      const { comments } = payload.entities
      return {
        ...state,
        ...comments
      }
    }

    case TopicTypes.PostComment: {
      const id = payload.id
      return {
        ...state,
        [id]: payload
      }
    }

    case TopicTypes.PostReply: {
      const { commentID, id } = payload
      const comt = { ...state[commentID] }
      comt.replies = (comt.replies || []).concat(id)

      return {
        ...state,
        [commentID]: comt
      }
    }

    default: {
      return state
    }
  }
}

const replies = (state: KeyMap = {}, action) => {
  const { type, payload } = action
  switch(type) {
    case TopicTypes.Comments: {
      const { replies } = payload.entities
      return {
        ...state,
        ...replies
      }
    }

    case TopicTypes.PostReply: {
      const id = payload.id
      return {
        ...state,
        [id]: payload
      }
    }

    default: {
      return state
    }
  }
}

export const getTopics = (state) => {
  return state.entities.topics
}

export const getComments = (state) => {
  return state.entities.comments
}

export const getReplies = (state) => {
  return state.entities.replies
}

export const getTopic = (id) => createSelector(
  getTopics,
  topics => topics[id]
)

export const getTags = (state) => {
  return state.entities.tags
}

export const getTagList = createSelector(
  getTags,
  tags => Object.values(tags)
)

export const getFullTopic = id => createSelector(
  getTopics,
  getTags,
  (topics, tags) => {
    let topic = topics[id]
    if (topic && topic.isFull) {
      topic = { ...topic }
      topic.tags = topic.tags.map(id => {
        return tags[id]
      })
      return topic
    }

    return
  }
)

export const getCommentsByTopicID = id => createSelector(
  getTopic(id),
  getComments,
  getReplies,
  (topic, comments, replies) => {
    if (!topic || !topic.comments) {
      return null
    }
    return topic.comments.map(cid => {
      const comt = { ...comments[cid] }

      if (comt.replies) {
        comt.replies = comt.replies.map(rid => replies[rid])
      }
      return comt
    })
  }
)

export default combineReducers({topics, draft, tags, comments, replies})
