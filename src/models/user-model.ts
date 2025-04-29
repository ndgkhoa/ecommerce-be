import mongoose from 'mongoose'

import toJSON from '~/utils/toJSON'

const UserSchema = new mongoose.Schema(
  {
    UserName: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    FullName: { type: String, required: true },
    Avatar: { type: Object }
  },
  { timestamps: true }
)

UserSchema.plugin(toJSON, { hiddenFields: ['Password'] })

export const User = mongoose.model('User', UserSchema)
