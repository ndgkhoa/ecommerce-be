import { Request, Response } from 'express'

import Category from '~/models/category'
import { validateCategory } from '~/middlewares/validation-middleware/category'
import { sendResponse } from '~/utils/response'

export const createCategory = async (req: Request, res: Response) => {
  try {
    const parsed = validateCategory(req.body)
    if (!parsed.success) {
      return sendResponse(res, 400, null, 'Dữ liệu không hợp lệ')
    }

    const { name, description } = parsed.data

    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      return sendResponse(res, 400, null, 'Danh mục đã tồn tại')
    }

    const newCategory = new Category({ name, description })
    await newCategory.save()

    sendResponse(res, 201, newCategory, 'Thêm danh mục thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find()
    sendResponse(res, 200, categories, 'Lấy danh sách danh mục thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedCategory) {
      return sendResponse(res, 404, null, 'Danh mục không tồn tại')
    }

    sendResponse(res, 200, updatedCategory, 'Cập nhật danh mục thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id)
    if (!deletedCategory) {
      return sendResponse(res, 404, null, 'Danh mục không tồn tại')
    }

    sendResponse(res, 200, null, 'Loại sản phẩm đã bị xóa')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}
