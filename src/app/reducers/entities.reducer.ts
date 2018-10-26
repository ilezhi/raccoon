import { combineReducers, createSelector } from '@ngrx/store'

import {
  TopicTypes,
  DraftTypes,
  HomeTypes,
  MyTypes,
  SolvedTypes,
  TagTypes
} from '../action/type'

const topics = (state: KeyMap = {}, action: Action): KeyMap => {
  const { type, payload } = action

  switch(type) {
    case HomeTypes.AllSuccess:
    case HomeTypes.DeptSuccess:
    case HomeTypes.TeamSuccess:
    case HomeTypes.AwesomeSuccess:
    case TopicTypes.TopicsSuccess:
    case MyTypes.TopicsSuccess:
    case SolvedTypes.QTopicsSuccess:
    case SolvedTypes.ATopicsSuccess: {

      if (typeof payload === 'number') {
        return state
      }

      const { topics } = payload.entities
      for (const id in topics) {
        const topic = state[id]
        if (topic && topic.isFull) {
          delete topics[id]
        }
      }

      return {
        ...state,
        ...topics
      }
    }

    case TopicTypes.PostSuccess: {
      const { topics } = payload.entities
      return {
        ...state,
        ...topics
      }
    }

    case TopicTypes.DetailSuccess:
    case TopicTypes.UpdateSuccess: {
      const { topics } = payload.entities
      const id = Object.keys(topics)[0]
      const comts = state[id].comments
      if (comts) {
        topics[id].comments = comts
      }

      return {
        ...state,
        ...topics
      }
    }

    case TopicTypes.CommentsSuccess: {
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

    case TopicTypes.PostCommentSuccess: {
      const { topicID, id } = payload
      const topic = { ...state[topicID] }
      if (topic.comments) {
        topic.comments.push(id)
      } else {
        topic.comments = [id]
      }

      return {
        ...state,
        [topicID]: topic
      }
    }

    case TopicTypes.FavorSuccess: {
      const { topicID: id, favor, categoryID } = payload
      const topic = {...state[id]}
      topic.isFavor = favor
      if (favor) {
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

    case TopicTypes.LikeSuccess: {
      const { id, type, like } = payload
      if (type !== 'topic') {
        return state
      }
      const topic = {...state[id]}
      topic.isLike = like
      if (like) {
        topic.likeCount += 1
      } else {
        topic.likeCount -= 1
      }

      return {
        ...state,
        [id]: topic
      }
    }

    case TopicTypes.TrashSuccess: {
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

const draft = (state: KeyMap = {}, action: Action): KeyMap => {
  const { type, payload } = action

  switch(type) {
    case DraftTypes.TopicsSuccess: {
      const { entities } = payload
      return {
        ...state,
        ...entities
      }
    }

    case DraftTypes.TopicSuccess:
    case DraftTypes.PostSuccess:
    case DraftTypes.UpdateSuccess: {
      const { id } = payload
      return {
        ...state,
        [id]: payload
      }
    }

    case DraftTypes.TrashSuccess: {
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
    case HomeTypes.AllSuccess:
    case HomeTypes.DeptSuccess:
    case HomeTypes.TeamSuccess:
    case HomeTypes.AwesomeSuccess:
    case TopicTypes.TopicsSuccess:
    case TopicTypes.DetailSuccess:
    case TopicTypes.PostSuccess:
    case TopicTypes.UpdateSuccess: {
      if (typeof payload === 'number') {
        return state
      }

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

    case TagTypes.PostSuccess: {
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
    case TopicTypes.CommentsSuccess: {
      const { comments } = payload.entities
      return {
        ...state,
        ...comments
      }
    }

    case TopicTypes.PostCommentSuccess: {
      const id = payload.id
      return {
        ...state,
        [id]: payload
      }
    }

    case TopicTypes.PostReplySuccess: {
      const { commentID, id } = payload
      const comt = { ...state[commentID] }
      comt.replies = comt.replies.concat(id)
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
    case TopicTypes.CommentsSuccess: {
      const { replies } = payload.entities
      return {
        ...state,
        ...replies
      }
    }

    case TopicTypes.PostReplySuccess: {
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
      return []
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
