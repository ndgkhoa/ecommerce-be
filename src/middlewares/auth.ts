import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

import { JwtPayload } from '~/types'
import { Permission, RolePermissions, UserRoles } from '~/models'

export const authenticate = passport.authenticate('jwt', { session: false })

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
//     if (err) {
//       return next(err)
//     }
//     if (!user) {
//       // Customize your error message here
//       return res.status(401).json({
//         status: 'error',
//         message: 'Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại',
//         code: 'INVALID_OR_EXPIRED_TOKEN'
//       })
//     }
//     req.user = user
//     return next()
//   })(req, res, next)
// }

export const authorize = (permissionCode: string, action: 'C' | 'R' | 'U' | 'D') => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.user as JwtPayload
    const userId = token.sub
    const userRole = await UserRoles.findOne({ UserId: userId })
    if (!userRole) {
      res.status(403).json({ message: 'Forbidden' })
      return
    }

    const permission = await Permission.findOne({ PermissionCode: permissionCode })
    if (!permission) {
      res.status(403).json({ message: 'Invalid permission' })
      return
    }

    const rolePermission = await RolePermissions.findOne({
      RoleId: userRole.RoleId,
      PermissionId: permission._id
    })

    if (!rolePermission || !rolePermission[action]) {
      res.status(403).json({ message: 'Permission denied' })
      return
    }

    next()
  }
}
