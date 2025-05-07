import { Request, Response } from 'express'

import { rolePermissionService, roleService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { ApiMessage, httpStatus } from '~/constants'

export const getRolePermission = async (req: Request, res: Response) => {
  // const permission = await rolePermissionService.getRolePermission(req.params.roleId)
  const role = await roleService.getRoleById(req.params.roleId)
  const response = { RoleId: role.id, RoleName: role.RoleName, Permissions: {} }
  sendResponse(res, httpStatus.OK, response, ApiMessage.Success)
}

export const createRolePermission = async (req: Request, res: Response) => {
  const newPermission = await rolePermissionService.createRolePermission({ ...req.body, RoleId: req.params.roleId })
  await newPermission.save()
  sendResponse(res, httpStatus.CREATED, newPermission, ApiMessage.Success)
}

// export const updatePermission = async (req: Request, res: Response) => {
//   const updatedPermission = await rolePermissionService.updatePermissionById(req.params.id, req.body)
//   sendResponse(res, httpStatus.OK, updatedPermission, ApiMessage.Success)
// }

// export const deletePermission = async (req: Request, res: Response) => {
//   await rolePermissionService.deletePermissionById(req.params.id)
//   sendResponse(res, httpStatus.OK, null, ApiMessage.Success)
// }
