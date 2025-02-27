import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(3, 'Tên danh mục phải có ít nhất 3 ký tự'),
  description: z.string().optional()
})

export const validateCategory = (data: any) => {
  return categorySchema.safeParse(data)
}
