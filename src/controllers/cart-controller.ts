import { Response } from 'express'

import { AuthRequest } from '~/types/types'
import Product from '~/models/product'
import Cart from '~/models/cart'
import { sendResponse } from '~/utils/response'

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId
    const cart = await Cart.findOne({ user: userId }).populate('items.product')

    sendResponse(res, 200, cart || [], 'Lấy giỏ hàng thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId
    const { productId, quantity } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      return sendResponse(res, 404, null, 'Sản phẩm không tồn tại')
    }

    let cart = await Cart.findOne({ user: userId })
    if (!cart) {
      cart = new Cart({ user: userId, items: [] })
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({ product: productId, quantity })
    }

    await cart.save()
    sendResponse(res, 200, cart, 'Đã thêm vào giỏ hàng')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId
    const { productId, quantity } = req.body

    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      return sendResponse(res, 404, null, 'Giỏ hàng không tồn tại')
    }

    const item = cart.items.find((item) => item.product.toString() === productId)
    if (!item) {
      return sendResponse(res, 404, null, 'Sản phẩm không có trong giỏ hàng')
    }

    item.quantity = quantity
    await cart.save()

    sendResponse(res, 200, cart, 'Cập nhật giỏ hàng thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId
    const { productId } = req.body

    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      return sendResponse(res, 404, null, 'Giỏ hàng không tồn tại')
    }

    cart.items.pull({ product: productId })
    await cart.save()

    sendResponse(res, 200, cart, 'Xóa sản phẩm khỏi giỏ hàng thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId
    await Cart.findOneAndDelete({ user: userId })

    sendResponse(res, 200, null, 'Giỏ hàng đã được xóa')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}
