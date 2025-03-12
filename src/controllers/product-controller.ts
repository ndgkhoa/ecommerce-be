import { Request, Response } from 'express'

import Product from '~/models/product'
import Category from '~/models/category'
import { validateProduct } from '~/middlewares/validation-middleware/product'
import { uploadImagesToCloudinary } from '~/utils/upload-image'
import { sendResponse } from '~/utils/response'

export const createProduct = async (req: Request, res: Response) => {
  try {
    const body = { ...req.body, price: Number(req.body.price) }
    const parsed = validateProduct(body)
    if (!parsed.success) {
      const errorMessages = parsed.error.errors.map((err) => err.message)
      return sendResponse(res, 400, null, errorMessages[0])
    }

    const imageFiles = req.files as Express.Multer.File[]
    const imageUrls = await uploadImagesToCloudinary(imageFiles)
    const newProduct = new Product({
      ...req.body,
      images: imageUrls.map((url, index) => ({
        uid: crypto.randomUUID(),
        name: imageFiles[index]?.originalname,
        url
      }))
    })

    await newProduct.save()
    sendResponse(res, 201, newProduct, 'Thêm sản phẩm thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { keyword, categoryId, minPrice, maxPrice } = req.query

    let filter: any = {}

    if (keyword) {
      filter.name = { $regex: keyword, $options: 'i' }
    }

    if (categoryId) {
      filter.categoryId = categoryId
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    const products = await Product.find(filter)
    sendResponse(res, 200, products, 'Lấy danh sách sản phẩm thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return sendResponse(res, 404, null, 'Sản phẩm không tồn tại')
    }

    sendResponse(res, 200, product, 'Lấy chi tiết sản phẩm thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const parsed = validateProduct(req.body)
    if (!parsed.success) {
      return sendResponse(res, 400, null, 'Dữ liệu không hợp lệ')
    }

    const product = await Product.findById(req.params.id)
    if (!product) {
      return sendResponse(res, 404, null, 'Sản phẩm không tồn tại')
    }

    const imageFiles = req.body.images || []

    const existingImages = imageFiles.filter((img: any) => img.url)

    const newImages = imageFiles.filter((img: any) => !img.url)
    const base64Images = newImages.map((img: any) => img.thumbUrl || '')

    const uploadedUrls = await uploadImagesToCloudinary(base64Images)

    const updatedImages = [
      ...existingImages,
      ...uploadedUrls.map((url, index) => ({
        uid: newImages[index]?.uid,
        name: newImages[index]?.name,
        url
      }))
    ]

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: updatedImages },
      { new: true }
    )

    sendResponse(res, 200, updatedProduct, 'Cập nhật sản phẩm thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return sendResponse(res, 404, null, 'Sản phẩm không tồn tại')
    }

    sendResponse(res, 200, null, 'Sản phẩm đã bị xóa')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const getCategoryOptions = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find()

    const options = categories.map((category) => ({
      Label: category.name,
      Value: category._id
    }))

    sendResponse(res, 200, options, 'Lấy danh sách danh mục thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}
