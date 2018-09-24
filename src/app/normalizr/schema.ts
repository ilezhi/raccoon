import { schema } from 'normalizr'

const tagSchema = new schema.Entity('tags')

export const topicSchema = new schema.Entity('topics', {
  tags: [tagSchema]
})

export const topicsSchema = new schema.Array(topicSchema)
