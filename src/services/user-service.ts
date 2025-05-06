import bcrypt from 'bcryptjs'

import { User } from '~/models'
import { ApiError } from '~/types'
import { CreateUserBody, UpdateUserBody } from '~/validations'
import { ApiMessage, httpStatus } from '~/constants'
import { uploadImage } from '~/utils/file'

export const checkUserExist = async (userName: string) => {
  const user = await User.findOne({ UserName: userName }).select('+Password')
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.NotFound)
  }
  return user
}

export const checkUserUnique = async (userName: string) => {
  const user = await User.findOne({ UserName: userName })
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, ApiMessage.AlreadyExist)
  }
}

export const checkPassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ApiMessage.PasswordIncorrect)
  }
}

export const createUser = async (body: CreateUserBody, avatarFile?: Express.Multer.File) => {
  const hashedPassword = await bcrypt.hash(body.Password, 10)
  let avatar = null
  if (avatarFile) {
    avatar = await uploadImage(avatarFile)
  }
  return new User({
    ...body,
    Password: hashedPassword,
    Avatar: avatar
  })
}

// export const queryUser = async (filter: any, options: any) => {
//   return await User.paginate(filter, options)
// }

export const getUserList = async () => {
  return await User.find()
}

export const getUserById = async (id: string) => {
  const user = await User.findById(id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.NotFound)
  }
  return user
}

export const updateUserById = async (id: string, body: UpdateUserBody, avatarFile?: Express.Multer.File) => {
  const user = await getUserById(id)
  if (user.UserName !== body.UserName) await checkUserUnique(body.UserName)
  let avatar = user.Avatar
  if (avatarFile) {
    avatar = await uploadImage(avatarFile)
  }
  return await User.findByIdAndUpdate(id, { ...body, Avatar: avatar }, { new: true })
}

export const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.NotFound)
  }
}
