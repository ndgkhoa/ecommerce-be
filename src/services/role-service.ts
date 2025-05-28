import { Role } from '~/models'
import { ApiError } from '~/types'
import { CreateRoleBody, UpdateRoleBody } from '~/validations'
import { HttpStatusCode, Message } from '~/constants'

export const checkUniqueByRoleName = async (roleName: string) => {
  const role = await Role.findOne({ RoleName: roleName })
  if (role) {
    throw new ApiError(HttpStatusCode.CONFLICT, Message.CONFLICT)
  }
}

export const createRole = async (body: CreateRoleBody) => {
  return new Role(body)
}

export const getRoleList = async (pageSize: number, pageIndex: number, keyword?: string) => {
  const filter: Record<string, unknown> = {}
  if (keyword) {
    const regex = { $regex: keyword, $options: 'i' }
    filter.$or = [{ RoleName: regex }]
  }
  const [roles, total] = await Promise.all([
    Role.find(filter)
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .exec(),
    Role.countDocuments(filter)
  ])
  return {
    roles,
    total
  }
}

export const getRoleById = async (id: string) => {
  const role = await Role.findById(id)
  if (!role) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
  }
  return role
}

export const updateRoleById = async (id: string, body: UpdateRoleBody) => {
  return await Role.findByIdAndUpdate(id, body, { new: true })
}

export const deleteRoleById = async (id: string) => {
  const deletedRole = await Role.findByIdAndDelete(id)
  if (!deletedRole) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
  }
}
