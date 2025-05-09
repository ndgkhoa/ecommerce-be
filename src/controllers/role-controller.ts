import { Request, Response } from 'express'

import { roleService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { HttpStatus, Message } from '~/constants'

export const getRoleList = async (req: Request, res: Response) => {
  const roles = await roleService.getRoleList()
  sendResponse(res, HttpStatus.OK, roles, Message.SUCCESS)
}

export const getRoleById = async (req: Request, res: Response) => {
  const role = await roleService.getRoleById(req.params.id)
  sendResponse(res, HttpStatus.OK, role, Message.SUCCESS)
}

export const createRole = async (req: Request, res: Response) => {
  await roleService.checkRoleNameUnique(req.body.RoleName)
  const newRole = await roleService.createRole(req.body)
  await newRole.save()
  sendResponse(res, HttpStatus.CREATED, newRole, Message.CREATED)
}

export const updateRole = async (req: Request, res: Response) => {
  const updatedRole = await roleService.updateRoleById(req.params.id, req.body)
  sendResponse(res, HttpStatus.OK, updatedRole, Message.UPDATED)
}

export const deleteRole = async (req: Request, res: Response) => {
  await roleService.deleteRoleById(req.params.id)
  sendResponse(res, HttpStatus.OK, null, Message.DELETED)
}
