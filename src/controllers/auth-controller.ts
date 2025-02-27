import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import User from '~/models/user'
import { generateToken } from '~/utils/jwt'
import { validateUser } from '~/middlewares/validation-middleware/user'

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = validateUser(req.body)
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.format() })
      return
    }

    const { name, email, password, role } = parsed.data

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'Email đã được sử dụng' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ name, email, password: hashedPassword, role })
    await newUser.save()

    res.status(201).json({ message: 'Đăng ký thành công', data: newUser })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      res.status(404).json({ message: 'Người dùng không tồn tại' })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400).json({ message: 'Sai mật khẩu' })
      return
    }

    const token = generateToken({ id: user._id, role: user.role })

    res.json({ message: 'Đăng nhập thành công', token })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' })
  }
}
