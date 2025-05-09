import { UserRole } from '~/models'
import { ApiError } from '~/types'
import { CreateUserRoleBody } from '~/validations'
import { HttpStatusCode, Message } from '~/constants'
import { roleService } from '~/services'

export const createUserRoles = async (userId: string, body: CreateUserRoleBody[]) => {
  try {
    return await UserRole.insertMany(
      body.map((item) => ({
        UserId: userId,
        RoleId: item
      })),
      { ordered: false }
    )
  } catch {
    throw new ApiError(HttpStatusCode.CONFLICT, Message.CONFLICT)
  }
}

export const getUserRoles = async (userId: string) => {
  const userRoles = await UserRole.find({ UserId: userId })
  return await Promise.all(
    userRoles.map(async (item) => {
      const role = await roleService.getRoleById(item.RoleId)
      return {
        Id: item.id,
        RoleId: item.RoleId,
        RoleName: role.RoleName,
        Description: role.Description
      }
    })
  )
}

export const deleteUserRoles = async (ids: string[]) => {
  const deletedUserRoles = await UserRole.deleteMany({ _id: { $in: ids } })
  if (deletedUserRoles.deletedCount === 0) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
  }
}
