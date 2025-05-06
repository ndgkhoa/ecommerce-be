import mongoose from 'mongoose'

import { toJSON } from '~/models/plugins'

const roleSchema = new mongoose.Schema(
  {
    RoleName: { type: String, required: true, unique: true },
    Description: { type: String }
  },
  { timestamps: true }
)

roleSchema.plugin(toJSON)

export const Role = mongoose.model('Role', roleSchema)
