import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

import { ActionType, JwtPayload } from '~/types'
import { sendResponse } from '~/utils/helpers'
import { HttpStatusCode, Message } from '~/constants'
import { permissionService, rolePermissionsService, userRolesService } from '~/services'

export const authenticate = passport.authenticate('jwt', { session: false })

export const authorize = (permissionCode: string, action: ActionType) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.user as JwtPayload
    const userRoles = await userRolesService.getRolesByUserId(token.sub)
    const roleIds = userRoles.map((role) => role.RoleId)
    const permission = await permissionService.getPermissionByPermissionCode(permissionCode)
    const isAuthorized = await rolePermissionsService.checkRoleHasPermission(roleIds, permission.id, action)
    if (!isAuthorized) {
      return sendResponse(res, HttpStatusCode.FORBIDDEN, null, Message.FORBIDDEN)
    }
    next()
  }
}
