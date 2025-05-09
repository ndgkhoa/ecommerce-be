import { Request, Response } from 'express'

import { rolePermissionService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { HttpStatus, Message } from '~/constants'

export const getRolePermission = async (req: Request, res: Response) => {
  const permissions = await rolePermissionService.getRolePermission(req.params.roleId)
  sendResponse(res, HttpStatus.OK, permissions, Message.SUCCESS)
}

export const createRolePermission = async (req: Request, res: Response) => {
  const newPermissions = await rolePermissionService.createRolePermission(req.params.roleId, req.body)
  sendResponse(res, HttpStatus.OK, newPermissions, Message.CREATED)
}

export const updateRolePermission = async (req: Request, res: Response) => {
  const updatedPermissions = await rolePermissionService.updateRolePermission(req.body)
  sendResponse(res, HttpStatus.OK, updatedPermissions, Message.UPDATED)
}

export const deleteRolePermission = async (req: Request, res: Response) => {
  await rolePermissionService.deleteRolePermission(req.body)
  sendResponse(res, HttpStatus.OK, null, Message.DELETED)
}
