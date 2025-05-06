import { Request, Response } from 'express'

import { roleService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { ApiMessage, httpStatus } from '~/constants'

export const getRoleList = async (req: Request, res: Response) => {
  const roles = await roleService.getRoleList()
  sendResponse(res, httpStatus.OK, roles, ApiMessage.Success)
}

export const getRoleById = async (req: Request, res: Response) => {
  const role = await roleService.getRoleById(req.params.id)
  sendResponse(res, httpStatus.OK, role, ApiMessage.Success)
}

export const createRole = async (req: Request, res: Response) => {
  await roleService.checkRoleUnique(req.body.UserName)
  console.log('body', req.body)

  const newRole = await roleService.createRole(req.body)
  await newRole.save()
  sendResponse(res, httpStatus.CREATED, newRole, ApiMessage.Success)
}

export const updateRole = async (req: Request, res: Response) => {
  const updatedRole = await roleService.updateRoleById(req.params.id, req.body)
  sendResponse(res, httpStatus.OK, updatedRole, ApiMessage.Success)
}

export const deleteRole = async (req: Request, res: Response) => {
  await roleService.deleteRoleById(req.params.id)
  sendResponse(res, httpStatus.OK, null, ApiMessage.Success)
}
