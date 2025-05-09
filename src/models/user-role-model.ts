import mongoose from 'mongoose'

import { toJSON } from '~/models/plugins'

const userRoleSchema = new mongoose.Schema(
  {
    UserId: { type: String, required: true },
    RoleId: { type: String, required: true }
  },
  { timestamps: true }
)

userRoleSchema.index({ UserId: 1, RoleId: 1 }, { unique: true })

userRoleSchema.plugin(toJSON)

export const UserRole = mongoose.model('UserRole', userRoleSchema)
