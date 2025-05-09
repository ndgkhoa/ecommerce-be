import { z } from 'zod'
import mongoose from 'mongoose'

import { Message } from '~/constants'

export const objectId = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: Message.INVALID_OBJECT_ID
})

export const password = z.string().min(6, Message.PASSWORD_TOO_SHORT)
