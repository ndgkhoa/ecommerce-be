import { Request, Response } from 'express'
import httpStatus from 'http-status'

import sendResponse from '~/utils/response'
import { ApiMessage, JwtPayload } from '~/types'
import { userService } from '~/services'

export const login = async (req: Request, res: Response) => {
  const user = await userService.checkExist(req.body.UserName)
  await userService.checkPassword(req.body.Password, user.Password)
  const payload = { sub: user._id.toString() }
  const accessToken = userService.signAccessToken(payload)
  const refreshToken = userService.signRefreshToken(user._id.toString())
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
  await userService.checkUnique(req.body.UserName)
  const newUser = await userService.createUser(req.body, req.file)
  await newUser.save()
  sendResponse(res, httpStatus.CREATED, newUser, ApiMessage.Success)
}

export const updateUser = async (req: Request, res: Response) => {
  const updatedUser = await userService.updateUserById(req.params.id, req.body, req.file)
  sendResponse(res, httpStatus.OK, updatedUser, ApiMessage.Success)
}

export const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUserById(req.params.id)
  sendResponse(res, httpStatus.OK, null, ApiMessage.Success)
}

export const refreshAccessToken = async (req: Request, res: Response) => {
  const token = userService.verifyRefreshToken(req.body.RefreshToken)
  const user = await userService.getUserById(token.sub)
  const payload = { sub: user._id.toString() }
  const newAccessToken = userService.signAccessToken(payload)
  sendResponse(res, httpStatus.OK, { AccessToken: newAccessToken }, ApiMessage.Success)
}

export const getInfoMine = async (req: Request, res: Response) => {
  const token = req.user as JwtPayload
  const user = await userService.getUserById(token.sub)
  res.send({
    User: user,
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
