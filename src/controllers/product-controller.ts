import { Request, Response } from 'express'

import Product from '~/models/product'
import { validateProduct } from '~/middlewares/validation-middleware/product'
import { uploadImageToCloudinary } from '~/utils/upload-image'

export const createProduct = async (req: Request, res: Response) => {
  try {
    const parsed = validateProduct(req.body)
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.format() })
      return
    }

    const imageUrl = req.file ? await uploadImageToCloudinary(req.file.buffer) : ''

    const newProduct = new Product({ ...req.body, image: imageUrl })
    await newProduct.save()

    res.status(201).json({ message: 'Thêm sản phẩm thành công', data: newProduct })
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' })
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { pageIndex = '1', pageSize = '10', search, minPrice, maxPrice, categoryId } = req.query

    const pageNumber = parseInt(pageIndex as string, 10)
    const size = parseInt(pageSize as string, 10)
    const skip = (pageNumber - 1) * size

    let query: any = {}

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = parseFloat(minPrice as string)
      if (maxPrice) query.price.$lte = parseFloat(maxPrice as string)
    }

    if (categoryId) {
      query.category = categoryId
    }

    if (search) {
      query.name = { $regex: new RegExp(search as string, 'i') }
    }

    const totalProducts = await Product.countDocuments(query)

    const products = await Product.find(query).populate('category').skip(skip).limit(size)

    res.json({
      total: totalProducts,
      pageIndex: pageNumber,
      pageSize: size,
      totalPages: Math.ceil(totalProducts / size),
      data: products
    })
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id)
  res.json({ data: product })
}

export const updateProduct = async (req: Request, res: Response) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json({ data: updatedProduct })
}

export const deleteProduct = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ message: 'Sản phẩm đã bị xóa' })
}
