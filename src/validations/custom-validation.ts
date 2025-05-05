import { z } from 'zod'
import mongoose from 'mongoose'

export const objectId = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'ID không hợp lệ'
})

export const password = z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
