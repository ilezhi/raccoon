import { schema } from 'normalizr'

const tag = new schema.Entity('tags')

export const topic = new schema.Entity('topics', {
  tags: [tag]
})
