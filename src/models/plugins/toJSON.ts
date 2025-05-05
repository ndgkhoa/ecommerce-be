import { Schema } from 'mongoose'

type ToJSONOptions = {
  hiddenFields?: string[]
}

export const toJSON = (schema: Schema, options: ToJSONOptions = {}) => {
  schema.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: (doc, ret) => {
      const { _id, ...rest } = ret
      delete rest.createdAt
      delete rest.updatedAt
      delete rest.__v
      if (options.hiddenFields && Array.isArray(options.hiddenFields)) {
        for (const field of options.hiddenFields) {
          delete rest[field]
        }
      }
      return {
        Id: _id,
        ...rest
      }
    }
  })
}
