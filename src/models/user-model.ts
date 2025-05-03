import mongoose from 'mongoose'

import { toJSON, paginate } from '~/models/plugins'

export interface IUser extends Document {
  UserName: string
  Password: string
  Email: string
  PhoneNumber: string
  FullName: string
  Avatar: any
}

interface InstitutionDocument extends mongoose.Document, IUser {}

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
UserSchema.plugin(paginate)

export const User = mongoose.model<IUser, mongoose.PaginateModel<InstitutionDocument>>('User', UserSchema)
