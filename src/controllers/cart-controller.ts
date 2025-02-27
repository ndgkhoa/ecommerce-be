import { Response } from 'express'

import { AuthRequest } from '~/types/types'
import Product from '~/models/product'
import Cart from '~/models/cart'

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const cart = await Cart.findOne({ user: userId }).populate('items.product')

    if (!cart) {
      res.status(200).json({ data: [] })
      return
    }

    res.json({ data: cart })
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' })
  }
}

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { productId, quantity } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      res.status(404).json({ error: 'Sản phẩm không tồn tại' })
      return
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
    res.status(200).json({ message: 'Đã thêm vào giỏ hàng', data: cart })
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' })
  }
}

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { productId, quantity } = req.body

    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      res.status(404).json({ error: 'Giỏ hàng không tồn tại' })
      return
    }
    const item = cart.items.find((item) => item.product.toString() === productId)
    if (!item) {
      res.status(404).json({ error: 'Sản phẩm không có trong giỏ hàng' })
      return
    }
    item.quantity = quantity
    await cart.save()
    res.status(200).json({ message: 'Cập nhật thành công', data: cart })
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' })
  }
}

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { productId } = req.body

    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      res.status(404).json({ error: 'Giỏ hàng không tồn tại' })
      return
    }
    cart.items.pull({ product: productId })
    await cart.save()

    res.status(200).json({ message: 'Xóa sản phẩm thành công', data: cart })
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' })
  }
}

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    await Cart.findOneAndDelete({ user: userId })

    res.status(200).json({ message: 'Giỏ hàng đã được xóa' })
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' })
  }
}
