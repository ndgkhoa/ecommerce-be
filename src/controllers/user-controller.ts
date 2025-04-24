import { Request, Response } from 'express'
import httpStatus from 'http-status'

import { createUserSchema, updateUserSchema } from '~/validations'
import sendApiResponse from '~/utils/api-helper'
import { ApiMessage } from '~/utils/constants'
import validate from '~/utils/validate'
import { userService } from '~/services'

export const login = async (req: Request, res: Response) => {
  const user = await userService.checkExist(req.body.UserName)
  await userService.checkPassword(req.body.Password, user.Password)
  const accessToken = userService.generateAccessToken({
    sub: user._id.toString()
  })
  const refreshToken = userService.generateRefreshToken(user._id.toString())
  const response = { AccessToken: accessToken, RefreshToken: refreshToken }
  sendApiResponse(res, httpStatus.OK, response, ApiMessage.Success)
}

export const getUserList = async (req: Request, res: Response) => {
  const list = await userService.getUserList()
  sendApiResponse(res, httpStatus.OK, list, ApiMessage.Success)
}

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id)
  sendApiResponse(res, httpStatus.OK, user, ApiMessage.Success)
}

export const createUser = async (req: Request, res: Response) => {
  const userData = validate(createUserSchema, req.body)
  await userService.checkUnique(userData.UserName)
  const newUser = await userService.createUser(userData, req.file)
  await newUser.save()
  sendApiResponse(res, httpStatus.CREATED, newUser, ApiMessage.Success)
}

export const updateUser = async (req: Request, res: Response) => {
  const userData = validate(updateUserSchema, req.body)
  const updatedUser = await userService.updateUserById(req.params.id, userData, req.file)
  sendApiResponse(res, httpStatus.OK, updatedUser, ApiMessage.Success)
}

export const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUserById(req.params.id)
  sendApiResponse(res, httpStatus.OK, null, ApiMessage.Success)
}

export const refreshAccessToken = async (req: Request, res: Response) => {
  const decoded = userService.verifyToken(req.body.RefreshToken)
  const user = await userService.getUserById(decoded.sub)
  const accessToken = userService.generateAccessToken({
    sub: user._id.toString()
  })
  sendApiResponse(res, httpStatus.OK, { AccessToken: accessToken }, ApiMessage.Success)
}

export const getInfoMine = async (req: Request, res: Response) => {
  res.send({ User: req.user, Permissions: [] })
}
