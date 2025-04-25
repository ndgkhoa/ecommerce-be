import jwt, { JwtPayload } from 'jsonwebtoken'
import httpStatus from 'http-status'
import bcrypt from 'bcryptjs'

import { User } from '~/models'
import { ApiError } from '~/utils/api-helper'
import { CreateUserInput, UpdateUserInput } from '~/validations'
import { uploadImage } from '~/config/cloudinary'
import config from '~/config/env'

export const generateAccessToken = (payload: JwtPayload) => {
  return jwt.sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + config.JWT_ACCESS_EXP
    },
    config.JWT_SECRET
  )
}

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    {
      sub: userId,
      exp: Math.floor(Date.now() / 1000) + config.JWT_REFRESH_EXP
    },
    config.JWT_SECRET
  )
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET) as JwtPayload
}

export const checkExist = async (username: string) => {
  const user = await User.findOne({ UserName: username }).select('+Password')
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Người dùng không tồn tại')
  }
  return user
}

export const checkUnique = async (username: string) => {
  const user = await User.findOne({ UserName: username })
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, 'Username đã tồn tại')
  }
}

export const checkPassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Sai mật khẩu')
  }
}

export const createUser = async (userData: CreateUserInput, avatarFile?: Express.Multer.File) => {
  const hashedPassword = await bcrypt.hash(userData.Password, 10)
  let avatar = null
  if (avatarFile) {
    avatar = await uploadImage(avatarFile)
  }
  return new User({
    ...userData,
    Password: hashedPassword,
    Avatar: avatar
  })
}

export const getUserList = async () => {
  return await User.find()
}

export const getUserById = async (id: string) => {
  const user = await User.findById(id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Người dùng không tồn tại')
  }
  return user
}

export const updateUserById = async (id: string, userData: UpdateUserInput, avatarFile?: Express.Multer.File) => {
  const user = await getUserById(id)
  let avatar = user.Avatar
  if (avatarFile) {
    avatar = await uploadImage(avatarFile)
  }
  return await User.findByIdAndUpdate(id, { ...userData, Avatar: avatar }, { new: true })
}

export const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Người dùng không tồn tại')
  }
}
