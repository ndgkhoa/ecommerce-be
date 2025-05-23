import mongoose from 'mongoose'

import { toJSON } from '~/models/plugins'

const userSchema = new mongoose.Schema(
  {
    UserName: { type: String, required: true, unique: true },
    Email: { type: String, required: true },
    // Password: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    FullName: { type: String, required: true },
    Avatar: { type: Object }
  },
  { timestamps: true }
)

userSchema.plugin(toJSON, { hiddenFields: ['Password'] })

export const User = mongoose.model('User', userSchema)
