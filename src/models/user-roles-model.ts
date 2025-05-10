import mongoose from 'mongoose'

import { toJSON } from '~/models/plugins'

const userRolesSchema = new mongoose.Schema(
  {
    UserId: { type: String, required: true },
    RoleId: { type: String, required: true }
  },
  { timestamps: true }
)

userRolesSchema.index({ UserId: 1, RoleId: 1 }, { unique: true })

userRolesSchema.plugin(toJSON)

export const UserRoles = mongoose.model('UserRoles', userRolesSchema)
