import { RolePermission } from '~/models'
import { ApiError } from '~/types'
import { CreateRolePermissionBody, UpdateRolePermissionBody } from '~/validations'
import { ApiMessage, httpStatus } from '~/constants'

export const createRolePermission = async (body: CreateRolePermissionBody) => {
  return new RolePermission(body)
}

export const getRolePermissionById = async (roleId: string) => {
  const res = await RolePermission.findById(roleId)
  if (!res) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.NotFound)
  }
  return res
}

export const updateRolePermissionById = async (id: string, body: UpdateRolePermissionBody) => {
  return await RolePermission.findByIdAndUpdate(id, body, { new: true })
}

export const deleteRoleById = async (id: string) => {
  const role = await RolePermission.findByIdAndDelete(id)
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.NotFound)
  }
}
