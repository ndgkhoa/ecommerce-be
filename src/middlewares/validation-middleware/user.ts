import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(3, 'Tên phải có ít nhất 3 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  role: z.enum(['user', 'admin']).default('user')
})

export const validateUser = (data: any) => {
  return userSchema.safeParse(data)
}
