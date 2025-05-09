import { Permission } from '~/models'
import { ApiError } from '~/types'
import { CreatePermissionBody, UpdatePermissionBody } from '~/validations'
import { HttpStatus, Message } from '~/constants'

export const checkPermissionCodeUnique = async (permissionCode: string) => {
  const permission = await Permission.findOne({ PermissionCode: permissionCode })
  if (permission) {
    throw new ApiError(HttpStatus.CONFLICT, Message.CONFLICT)
  }
}

export const checkPermissionNameUnique = async (permissionName: string) => {
  const permission = await Permission.findOne({ PermissionName: permissionName })
  if (permission) {
    throw new ApiError(HttpStatus.CONFLICT, Message.CONFLICT)
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
    throw new ApiError(HttpStatus.NOT_FOUND, Message.NOT_FOUND)
  }
  return permission
}

export const updatePermissionById = async (id: string, body: UpdatePermissionBody) => {
  return await Permission.findByIdAndUpdate(id, body, { new: true })
}

export const deletePermissionById = async (id: string) => {
  const permission = await Permission.findByIdAndDelete(id)
  if (!permission) {
    throw new ApiError(HttpStatus.NOT_FOUND, Message.NOT_FOUND)
  }
}
