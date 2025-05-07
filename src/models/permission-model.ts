import mongoose from 'mongoose'

import { toJSON } from '~/models/plugins'

const permissionSchema = new mongoose.Schema(
  {
    PermissionCode: { type: String, required: true, unique: true },
    PermissionName: { type: String, required: true, unique: true },
    Description: { type: String }
  },
  { timestamps: true }
)

permissionSchema.plugin(toJSON)

export const Permission = mongoose.model('Permission', permissionSchema)
