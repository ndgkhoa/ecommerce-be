import bcrypt from 'bcryptjs'

import { User } from '~/models'
import { ApiError } from '~/types'
import { CreateUserBody, UpdateUserBody } from '~/validations'
import { HttpStatusCode, Message } from '~/constants'
import { uploadImage } from '~/utils/file'

export const checkUniqueByEmail = async (email: string) => {
  const user = await User.findOne({ Email: email })
  if (user) {
    throw new ApiError(HttpStatusCode.CONFLICT, Message.CONFLICT)
  }
}

export const checkUniqueByUserName = async (userName: string) => {
  const user = await User.findOne({ UserName: userName })
  if (user) {
    throw new ApiError(HttpStatusCode.CONFLICT, Message.CONFLICT)
  }
}

export const checkPassword = async (password: string, hash: string) => {
  const isMatch = await bcrypt.compare(password, hash)
  if (!isMatch) {
    throw new ApiError(HttpStatusCode.UNAUTHORIZED, Message.INVALID_PASSWORD)
  }
}

export const createUser = async (body: CreateUserBody, avatarFile?: Express.Multer.File) => {
  // const hash = await bcrypt.hash(body.Password, 10)
  let avatar = null
  if (avatarFile) {
    avatar = await uploadImage(avatarFile)
  }
  return new User({
    ...body,
    // Password: hash,
    Avatar: avatar
  })
}

export const getUserList = async (pageSize: number, pageIndex: number, keyword?: string) => {
  const filter: Record<string, unknown> = {}
  if (keyword) {
    filter.FullName = { $regex: keyword, $options: 'i' }
  }
  return await User.find(filter)
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .exec()
}

export const getUserById = async (id: string) => {
  const user = await User.findById(id)
  if (!user) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
  }
  return user
}

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ Email: email }).select('+Password')
  if (!user) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
  }
  return user
}

export const getUserByUserName = async (userName: string) => {
  const user = await User.findOne({ UserName: userName }).select('+Password')
  if (!user) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
  }
  return user
}

export const updateUserById = async (id: string, body: UpdateUserBody, avatarFile?: Express.Multer.File) => {
  const updatedUser = await getUserById(id)
  let avatar = updatedUser.Avatar
  if (avatarFile) {
    avatar = await uploadImage(avatarFile)
  }
  return await User.findByIdAndUpdate(id, { ...body, Avatar: avatar }, { new: true })
}

export const deleteUserById = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id)
  if (!deletedUser) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
  }
}
