import { UserRoles } from '~/models'
import { ApiError } from '~/types'
import { CreateUserRolesBody } from '~/validations'
import { HttpStatusCode, Message } from '~/constants'
import { roleService } from '~/services'

export const createRolesForUser = async (userId: string, body: CreateUserRolesBody[]) => {
  try {
    return await UserRoles.insertMany(
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

export const getRolesByUserId = async (userId: string) => {
  const userRoles = await UserRoles.find({ UserId: userId })
  if (!userRoles) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
  }
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
  const deletedUserRoles = await UserRoles.deleteMany({ _id: { $in: ids } })
  if (deletedUserRoles.deletedCount === 0) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
  }
}
