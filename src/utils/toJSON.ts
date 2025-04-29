import { Schema } from 'mongoose'

interface ToJSONOptions {
  hiddenFields?: string[]
}

function toJSON(schema: Schema, options: ToJSONOptions = {}) {
  schema.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: function (doc, ret) {
      const { _id, __v, createdAt, updatedAt, ...rest } = ret
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

export default toJSON
