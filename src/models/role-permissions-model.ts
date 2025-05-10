import mongoose from 'mongoose'

import { toJSON } from '~/models/plugins'

const rolePermissionsSchema = new mongoose.Schema(
  {
    RoleId: { type: String, required: true },
    PermissionId: { type: String, required: true },
    C: { type: Boolean },
    R: { type: Boolean },
    U: { type: Boolean },
    D: { type: Boolean }
  },
  { timestamps: true }
)

rolePermissionsSchema.index({ RoleId: 1, PermissionId: 1 }, { unique: true })

rolePermissionsSchema.plugin(toJSON)

export const RolePermissions = mongoose.model('RolePermissions', rolePermissionsSchema)
