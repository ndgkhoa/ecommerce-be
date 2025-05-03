import { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export const paginate = (schema: Schema) => schema.plugin(mongoosePaginate)
