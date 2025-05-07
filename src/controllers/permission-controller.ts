import { Request, Response } from 'express'

import { permissionService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { ApiMessage, httpStatus } from '~/constants'

export const getPermissionList = async (req: Request, res: Response) => {
  const permissions = await permissionService.getPermissionList()
  sendResponse(res, httpStatus.OK, permissions, ApiMessage.Success)
}

export const getPermissionById = async (req: Request, res: Response) => {
  const permission = await permissionService.getPermissionById(req.params.id)
  sendResponse(res, httpStatus.OK, permission, ApiMessage.Success)
}

export const createPermission = async (req: Request, res: Response) => {
  await permissionService.checkPermissionNameUnique(req.body.PermissionName)
  await permissionService.checkPermissionCodeUnique(req.body.PermissionCode)
  const newPermission = await permissionService.createPermission(req.body)
  await newPermission.save()
  sendResponse(res, httpStatus.CREATED, newPermission, ApiMessage.Success)
}

export const updatePermission = async (req: Request, res: Response) => {
  const updatedPermission = await permissionService.updatePermissionById(req.params.id, req.body)
  sendResponse(res, httpStatus.OK, updatedPermission, ApiMessage.Success)
}

export const deletePermission = async (req: Request, res: Response) => {
  await permissionService.deletePermissionById(req.params.id)
  sendResponse(res, httpStatus.OK, null, ApiMessage.Success)
}
