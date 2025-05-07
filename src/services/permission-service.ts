import { Permission } from '~/models'
import { ApiError } from '~/types'
import { CreatePermissionBody, UpdatePermissionBody } from '~/validations'
import { ApiMessage, httpStatus } from '~/constants'

export const checkPermissionCodeUnique = async (code: string) => {
  const permission = await Permission.findOne({ Code: code })
  if (permission) {
    throw new ApiError(httpStatus.CONFLICT, ApiMessage.AlreadyExist)
  }
}

export const checkPermissionNameUnique = async (permissionName: string) => {
  const permission = await Permission.findOne({ PermissionName: permissionName })
  if (permission) {
    throw new ApiError(httpStatus.CONFLICT, ApiMessage.AlreadyExist)
  }
}

export const createPermission = async (body: CreatePermissionBody) => {
  return new Permission(body)
}

export const getPermissionList = async () => {
  return await Permission.find()
}

export const getPermissionById = async (id: string) => {
  const permission = await Permission.findById(id)
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.NotFound)
  }
  return permission
}

export const updatePermissionById = async (id: string, body: UpdatePermissionBody) => {
  return await Permission.findByIdAndUpdate(id, body, { new: true })
}

export const deletePermissionById = async (id: string) => {
  const permission = await Permission.findByIdAndDelete(id)
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.NotFound)
  }
}
