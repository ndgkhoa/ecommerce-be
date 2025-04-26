import { Request, Response } from 'express'
import httpStatus from 'http-status'

import { CreateUserSchema, UpdateUserSchema } from '~/validations'
import sendResponse from '~/utils/send-response'
import { ApiMessage } from '~/types'
import validate from '~/utils/validate'
import { userService } from '~/services'

export const login = async (req: Request, res: Response) => {
  const user = await userService.checkExist(req.body.UserName)
  await userService.checkPassword(req.body.Password, user.Password)
  const accessToken = userService.generateAccessToken({
    sub: user._id.toString(),
    roles: ['user', 'content_editor'],
    perms: ['posts:read', 'posts:write']
  })
  const refreshToken = userService.generateRefreshToken(user._id.toString())
  const response = { UserId: user._id, AccessToken: accessToken, RefreshToken: refreshToken }
  sendResponse(res, httpStatus.OK, response, ApiMessage.Success)
}

export const getUserList = async (req: Request, res: Response) => {
  const list = await userService.getUserList()
  sendResponse(res, httpStatus.OK, list, ApiMessage.Success)
}

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id)
  sendResponse(res, httpStatus.OK, user, ApiMessage.Success)
}

export const createUser = async (req: Request, res: Response) => {
  const userData = validate(CreateUserSchema, req.body)
  await userService.checkUnique(userData.UserName)
  const newUser = await userService.createUser(userData, req.file)
  await newUser.save()
  sendResponse(res, httpStatus.CREATED, newUser, ApiMessage.Success)
}

export const updateUser = async (req: Request, res: Response) => {
  const userData = validate(UpdateUserSchema, req.body)
  const updatedUser = await userService.updateUserById(req.params.id, userData, req.file)
  sendResponse(res, httpStatus.OK, updatedUser, ApiMessage.Success)
}

export const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUserById(req.params.id)
  sendResponse(res, httpStatus.OK, null, ApiMessage.Success)
}

export const refreshAccessToken = async (req: Request, res: Response) => {
  const decoded = userService.verifyToken(req.body.RefreshToken)
  const user = await userService.getUserById(decoded.sub!)
  const accessToken = userService.generateAccessToken({
    sub: user._id.toString()
  })
  sendResponse(res, httpStatus.OK, { AccessToken: accessToken }, ApiMessage.Success)
}

export const getInfoMine = async (req: Request, res: Response) => {
  res.send({
    User: req.user,
    Permissions: [
      {
        ActivityId: '1',
        ActivityName: 'Quản lý người dùng',
        Code: 'USER_MANAGEMENT',
        C: true,
        R: true,
        U: true,
        D: true
      },
      {
        ActivityId: '2',
        ActivityName: 'Quản lý sản phẩm',
        Code: 'PRODUCT_MANAGEMENT',
        C: true,
        R: true,
        U: true,
        D: true
      }
    ]
  })
}
