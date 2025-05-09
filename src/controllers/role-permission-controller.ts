import { Request, Response } from 'express'

import { rolePermissionService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { HttpStatusCode, Message } from '~/constants'

export const getRolePermissions = async (req: Request, res: Response) => {
  const rolePermissions = await rolePermissionService.getRolePermissions(req.params.roleId)
  sendResponse(res, HttpStatusCode.OK, rolePermissions, Message.SUCCESS)
}

export const createRolePermissions = async (req: Request, res: Response) => {
  const newRolePermissions = await rolePermissionService.createRolePermissions(req.params.roleId, req.body)
  sendResponse(res, HttpStatusCode.OK, newRolePermissions, Message.CREATED)
}

export const updateRolePermissions = async (req: Request, res: Response) => {
  const updatedRolesPermissions = await rolePermissionService.updateRolePermissions(req.body)
  sendResponse(res, HttpStatusCode.OK, updatedRolesPermissions, Message.UPDATED)
}

export const deleteRolePermissions = async (req: Request, res: Response) => {
  await rolePermissionService.deleteRolePermissions(req.body)
  sendResponse(res, HttpStatusCode.OK, null, Message.DELETED)
}
