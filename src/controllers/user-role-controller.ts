import { Request, Response } from 'express'

import { userRoleService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { HttpStatusCode, Message } from '~/constants'

export const getUserRoles = async (req: Request, res: Response) => {
  const userRoles = await userRoleService.getUserRoles(req.params.userId)
  sendResponse(res, HttpStatusCode.OK, userRoles, Message.SUCCESS)
}

export const createUserRoles = async (req: Request, res: Response) => {
  const newUserRoles = await userRoleService.createUserRoles(req.params.userId, req.body)
  sendResponse(res, HttpStatusCode.OK, newUserRoles, Message.CREATED)
}

export const deleteUserRoles = async (req: Request, res: Response) => {
  await userRoleService.deleteUserRoles(req.body)
  sendResponse(res, HttpStatusCode.OK, null, Message.DELETED)
}
