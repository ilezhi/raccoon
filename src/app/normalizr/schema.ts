import { schema } from 'normalizr'

// topic, tag
const tagSchema = new schema.Entity('tags')
export const topicSchema = new schema.Entity('topics', {
  tags: [tagSchema]
})

// comment, reply
const replySchema = new schema.Entity('replies')
export const commentSchema = new schema.Entity('comments', {
  replies: [replySchema]
})

export const topicsSchema = new schema.Array(topicSchema)
export const commentsSchema = new schema.Array(commentSchema)
