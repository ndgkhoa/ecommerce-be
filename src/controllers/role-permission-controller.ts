import { Request, Response } from 'express'

import { rolePermissionService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { ApiMessage, httpStatus } from '~/constants'

export const getRolePermission = async (req: Request, res: Response) => {
  const permissions = await rolePermissionService.getRolePermission(req.params.roleId)
  sendResponse(res, httpStatus.OK, permissions, ApiMessage.Success)
}

export const createRolePermission = async (req: Request, res: Response) => {
  const newPermissions = await rolePermissionService.createRolePermission(req.params.roleId, req.body)
  sendResponse(res, httpStatus.OK, newPermissions, ApiMessage.Success)
}

export const updateRolePermission = async (req: Request, res: Response) => {
  const updatedPermissions = await rolePermissionService.updateRolePermission(req.body)
  sendResponse(res, httpStatus.OK, updatedPermissions, ApiMessage.Success)
}

export const deleteRolePermission = async (req: Request, res: Response) => {
  await rolePermissionService.deleteRolePermission(req.body)
  sendResponse(res, httpStatus.OK, null, ApiMessage.Success)
}
