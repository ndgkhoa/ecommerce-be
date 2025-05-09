import { z } from 'zod'

import { Message } from '~/constants'
import { objectId, password } from '~/validations/custom-validation'

export const createUserSchema = {
  body: z.object({
    UserName: z.string().min(3, Message.USERNAME_TOO_SHORT),
    Password: password,
    Email: z.string().email(Message.INVALID_EMAIL),
    PhoneNumber: z.string().min(10, Message.INVALID_PHONE),
    FullName: z.string().min(3, Message.FULLNAME_TOO_SHORT)
  })
}

export const updateUserSchema = {
  params: z.object({
    id: objectId
  }),
  body: createUserSchema.body
}

export type CreateUserBody = z.infer<typeof createUserSchema.body>
export type UpdateUserBody = z.infer<typeof updateUserSchema.body>
