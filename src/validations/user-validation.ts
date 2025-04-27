import { z } from 'zod'

export const CreateUserSchema = z.object({
  UserName: z.string().min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự.'),
  Password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự.'),
  Email: z.string().email('Email không hợp lệ.'),
  PhoneNumber: z.string().min(10, 'Số điện thoại không hợp lệ.'),
  FullName: z.string().min(3, 'Họ và tên phải có ít nhất 3 ký tự.')
})

export const UpdateUserSchema = CreateUserSchema.extend({
  Avatar: z.string().optional()
}).partial()

export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
