import { SysRole } from '~/models'
import { ApiError } from '~/types'
import { CreateRoleBody, UpdateRoleBody } from '~/validations'
import { ApiMessage, httpStatus } from '~/constants'

export const checkRoleExist = async (roleName: string) => {
  const role = await SysRole.findOne({ RoleName: roleName })
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.NotFound)
  }
  return role
}

export const checkRoleUnique = async (roleName: string) => {
  const role = await SysRole.findOne({ RoleName: roleName })
  if (role) {
    throw new ApiError(httpStatus.CONFLICT, ApiMessage.AlreadyExist)
  }
}

export const createRole = async (body: CreateRoleBody) => {
  return new SysRole({ ...body })
}

export const getRoleList = async () => {
  return await SysRole.find()
}

export const getRoleById = async (id: string) => {
  const role = await SysRole.findById(id)
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.NotFound)
  }
  return role
}

export const updateRoleById = async (id: string, body: UpdateRoleBody) => {
  return await SysRole.findByIdAndUpdate(id, { ...body }, { new: true })
}

export const deleteRoleById = async (id: string) => {
  const role = await SysRole.findByIdAndDelete(id)
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.NotFound)
  }
}
