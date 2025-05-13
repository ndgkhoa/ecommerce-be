import { Request, Response } from 'express'

import { rolePermissionsService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { HttpStatusCode, Message } from '~/constants'

export const getRolePermissions = async (req: Request, res: Response) => {
  const rolePermissions = await rolePermissionsService.getPermissionsByRoleId(req.query.roleId as string)
  sendResponse(res, HttpStatusCode.OK, rolePermissions, Message.SUCCESS)
}

export const createRolePermissions = async (req: Request, res: Response) => {
  const newRolePermissions = await rolePermissionsService.createPermissionsForRole(req.params.roleId, req.body)
  sendResponse(res, HttpStatusCode.OK, newRolePermissions, Message.CREATED)
}

export const updateRolePermissions = async (req: Request, res: Response) => {
  const updatedRolePermissions = await rolePermissionsService.updateRolePermissions(req.body)
  sendResponse(res, HttpStatusCode.OK, updatedRolePermissions, Message.UPDATED)
}

export const deleteRolePermissions = async (req: Request, res: Response) => {
  await rolePermissionsService.deleteRolePermissions(req.body)
  sendResponse(res, HttpStatusCode.OK, null, Message.DELETED)
}
