import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'
import bcrypt from 'bcryptjs'

import { User } from '~/models'
import { ApiError, TokenType } from '~/types'
import { CreateUserInput, UpdateUserInput } from '~/validations'
import { uploadImage } from '~/config/cloudinary'
import config from '~/config/env'
import { privateKey } from '~/config/keys'

export const signAccessToken = (payload: TokenType) => {
  const now = Math.floor(Date.now() / 1000)
  return jwt.sign(
    {
      ...payload,
      jti: crypto.randomUUID(),
      iss: config.JWT_ISSUER,
      aud: config.JWT_AUDIENCE,
      iat: now,
      exp: now + config.JWT_ACCESS_EXP
    },
    privateKey,
    { algorithm: 'RS256' }
  )
}

export const signRefreshToken = (userId: string) => {
  const now = Math.floor(Date.now() / 1000)
  return jwt.sign(
    {
      sub: userId,
      jti: crypto.randomUUID(),
      iat: now,
      exp: now + config.JWT_REFRESH_EXP,
      refresh: true
    },
    config.JWT_REFRESH_SECRET,
    { algorithm: 'HS512' }
  )
}

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET, { algorithms: ['HS512'] }) as TokenType
}

export const checkExist = async (username: string) => {
  const user = await User.findOne({ UserName: username }).select('+Password')
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Người dùng không tồn tại.')
  }
  return user
}

export const checkUnique = async (username: string) => {
  const user = await User.findOne({ UserName: username })
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, 'Username đã tồn tại.')
  }
}

export const checkPassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Sai mật khẩu.')
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
    throw new ApiError(httpStatus.NOT_FOUND, 'Người dùng không tồn tại.')
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
    throw new ApiError(httpStatus.NOT_FOUND, 'Người dùng không tồn tại.')
  }
}
