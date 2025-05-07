import mongoose from 'mongoose'

import { toJSON } from '~/models/plugins'

const rolePermissionSchema = new mongoose.Schema(
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

rolePermissionSchema.plugin(toJSON)

export const RolePermission = mongoose.model('RolePermission', rolePermissionSchema)
