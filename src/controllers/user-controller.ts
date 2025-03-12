import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import User from '~/models/user'
import { generateToken } from '~/config/jwt'
import { validateUser } from '~/middlewares/validation-middleware/user'
import { AuthRequest } from '~/types/types'
import { sendResponse } from '~/utils/response'

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = validateUser(req.body)
    if (!parsed.success) {
      return sendResponse(res, 400, null, 'Dữ liệu không hợp lệ')
    }

    const { name, email, password, role } = parsed.data

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return sendResponse(res, 400, null, 'Email đã được sử dụng')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ name, email, password: hashedPassword, role })
    await newUser.save()

    sendResponse(res, 201, newUser, 'Đăng ký thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return sendResponse(res, 404, null, 'Người dùng không tồn tại')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return sendResponse(res, 400, null, 'Sai mật khẩu')
    }

    const token = generateToken({ userId: user._id, role: user.role })

    sendResponse(res, 200, { AccessToken: token, isAdmin: user.role === 'admin' }, 'Đăng nhập thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}

export const getInfoMine = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return sendResponse(res, 401, null, 'Unauthorized')
    }

    const user = await User.findById(req.user.userId).select('-password')

    if (!user) {
      return sendResponse(res, 404, null, 'User not found')
    }

    sendResponse(res, 200, user, 'Lấy thông tin người dùng thành công')
  } catch (error) {
    sendResponse(res, 500, null, 'Lỗi server')
  }
}
