import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'

const UserSchema = new mongoose.Schema(
  {
    UserName: { type: String, required: true, unique: true },
    Password: { type: String, required: true, select: false },
    Email: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    FullName: { type: String, required: true },
    Avatar: { type: Object }
  },
  { timestamps: true }
)

UserSchema.plugin(mongooseHidden(), {
  hidden: { __v: true, createdAt: true, updatedAt: true },
  defaultHidden: { _id: false }
})

export const User = mongoose.model('User', UserSchema)
