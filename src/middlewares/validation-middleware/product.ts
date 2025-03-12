import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(3, 'Tên sản phẩm phải có ít nhất 3 ký tự'),
  price: z.number().positive('Giá phải lớn hơn 0'),
  description: z.string().optional(),
  categoryId: z.string().min(24, 'ID danh mục không hợp lệ')
})

export const validateProduct = (data: any) => {
  return productSchema.safeParse(data)
}
