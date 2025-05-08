import { Role } from '~/models'
import { ApiError } from '~/types'
import { CreateRoleBody, UpdateRoleBody } from '~/validations'
import { ApiMessage, httpStatus } from '~/constants'

export const checkRoleNameUnique = async (roleName: string) => {
  const role = await Role.findOne({ RoleName: roleName })
  if (role) {
    throw new ApiError(httpStatus.CONFLICT, ApiMessage.RecordAlreadyExist)
  }
}

export const createRole = async (body: CreateRoleBody) => {
  return new Role(body)
}

export const getRoleList = async () => {
  return await Role.find()
}

export const getRoleById = async (id: string) => {
  const role = await Role.findById(id)
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.RecordNotFound)
  }
  return role
}

export const updateRoleById = async (id: string, body: UpdateRoleBody) => {
  return await Role.findByIdAndUpdate(id, body, { new: true })
}

export const deleteRoleById = async (id: string) => {
  const role = await Role.findByIdAndDelete(id)
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.RecordNotFound)
  }
}
