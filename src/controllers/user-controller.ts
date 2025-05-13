import { Request, Response } from 'express'

import { JwtPayload } from '~/types'
import { rolePermissionsService, userRolesService, userService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '~/utils/jwt'
import { HttpStatusCode, Message } from '~/constants'

export const login = async (req: Request, res: Response) => {
  const user = await userService.getUserByEmail(req.body.Email)
  await userService.checkPassword(req.body.Password, user.Password)
  const payload = { sub: user.id }
  const accessToken = signAccessToken(payload)
  const refreshToken = signRefreshToken(user.id)
  const response = { UserId: user.id, AccessToken: accessToken, RefreshToken: refreshToken }
  sendResponse(res, HttpStatusCode.OK, response, Message.LOGIN_SUCCESS)
}

export const getUserList = async (req: Request, res: Response) => {
  const users = await userService.getUserList()
  sendResponse(res, HttpStatusCode.OK, users, Message.SUCCESS)
}

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id)
  sendResponse(res, HttpStatusCode.OK, user, Message.SUCCESS)
}

export const createUser = async (req: Request, res: Response) => {
  await userService.checkUniqueByEmail(req.body.Email)
  const newUser = await userService.createUser(req.body, req.file)
  await newUser.save()
  sendResponse(res, HttpStatusCode.CREATED, newUser, Message.CREATED)
}

export const updateUser = async (req: Request, res: Response) => {
  const updatedUser = await userService.updateUserById(req.params.id, req.body, req.file)
  sendResponse(res, HttpStatusCode.OK, updatedUser, Message.UPDATED)
}

export const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUserById(req.params.id)
  sendResponse(res, HttpStatusCode.OK, null, Message.DELETED)
}

export const refreshAccessToken = async (req: Request, res: Response) => {
  const token = verifyRefreshToken(req.body.RefreshToken)
  const user = await userService.getUserById(token.sub)
  const payload = { sub: user.id }
  const newAccessToken = signAccessToken(payload)
  sendResponse(res, HttpStatusCode.OK, { AccessToken: newAccessToken }, Message.SUCCESS)
}

export const getInfoMine = async (req: Request, res: Response) => {
  const token = req.user as JwtPayload
  const user = await userService.getUserById(token.sub)
  const userRoles = await userRolesService.getRolesByUserId(user.id)
  const roleIds = userRoles.map((ur) => ur.RoleId)
  const permissions = await Promise.all(roleIds.map((roleId) => rolePermissionsService.getPermissionsByRoleId(roleId)))
  res.send({
    User: user,
    Permissions: permissions.flatMap((permission) => permission.Permissions)
  })
}
