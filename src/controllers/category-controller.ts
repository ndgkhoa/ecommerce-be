import { Request, Response } from 'express'

import Category from '~/models/category'
import { validateCategory } from '~/middlewares/validation-middleware/category'

export const createCategory = async (req: Request, res: Response) => {
  try {
    const parsed = validateCategory(req.body)
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.format() })
      return
    }

    const { name, description } = parsed.data

    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      res.status(400).json({ message: 'Danh mục đã tồn tại' })
      return
    }

    const newCategory = new Category({ name, description })
    await newCategory.save()

    res.status(201).json({ message: 'Thêm danh mục thành công', data: newCategory })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' })
  }
}

export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.find()
  res.json({ data: categories })
}

export const updateCategory = async (req: Request, res: Response) => {
  const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json({ data: updatedCategory })
}

export const deleteCategory = async (req: Request, res: Response) => {
  await Category.findByIdAndDelete(req.params.id)
  res.json({ message: 'Loại sản phẩm đã bị xóa' })
}
