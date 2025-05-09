import { Request, Response } from 'express'

import { permissionService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { HttpStatusCode, Message } from '~/constants'

export const getPermissionList = async (req: Request, res: Response) => {
  const permissions = await permissionService.getPermissionList()
  sendResponse(res, HttpStatusCode.OK, permissions, Message.SUCCESS)
}

export const getPermissionById = async (req: Request, res: Response) => {
  const permission = await permissionService.getPermissionById(req.params.id)
  sendResponse(res, HttpStatusCode.OK, permission, Message.SUCCESS)
}

export const createPermission = async (req: Request, res: Response) => {
  await permissionService.checkPermissionNameUnique(req.body.PermissionName)
  await permissionService.checkPermissionCodeUnique(req.body.PermissionCode)
  const newPermission = await permissionService.createPermission(req.body)
  await newPermission.save()
  sendResponse(res, HttpStatusCode.CREATED, newPermission, Message.CREATED)
}

export const updatePermission = async (req: Request, res: Response) => {
  const updatedPermission = await permissionService.updatePermissionById(req.params.id, req.body)
  sendResponse(res, HttpStatusCode.OK, updatedPermission, Message.UPDATED)
}

export const deletePermission = async (req: Request, res: Response) => {
  await permissionService.deletePermissionById(req.params.id)
  sendResponse(res, HttpStatusCode.OK, null, Message.DELETED)
}
