import { Response, NextFunction } from 'express'

import { AuthRequest } from '~/types/types'
import { verifyToken } from '~/config/jwt'

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('AccessToken')?.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'Không có token, từ chối truy cập' })
    return
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    res.status(401).json({ message: 'Token không hợp lệ' })
    return
  }

  req.user = decoded as { userId: string; role: string }
  next()
}

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ message: 'Chỉ admin mới có quyền này' })
    return
  }
  next()
}
