import mongoose from 'mongoose'

import { toJSON } from '~/models/plugins'

const sysRoleSchema = new mongoose.Schema(
  {
    RoleName: { type: String, required: true, unique: true },
    Description: { type: String }
  },
  { timestamps: true }
)

sysRoleSchema.plugin(toJSON)

export const SysRole = mongoose.model('SysRole', sysRoleSchema)
