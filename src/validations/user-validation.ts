import { z } from 'zod'

import { objectId, password } from '~/validations/custom-validation'

export const CreateUserSchema = {
  body: z.object({
    UserName: z.string().min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự'),
    Password: password,
    Email: z.string().email('Email không hợp lệ'),
    PhoneNumber: z.string().min(10, 'Số điện thoại không hợp lệ'),
    FullName: z.string().min(3, 'Họ và tên phải có ít nhất 3 ký tự')
  })
}

export const UpdateUserSchema = {
  params: z.object({
    id: objectId
  }),
  body: CreateUserSchema.body.omit({ Password: true })
}

export type CreateUserData = z.infer<typeof CreateUserSchema.body>
export type UpdateUserData = z.infer<typeof UpdateUserSchema.body>
