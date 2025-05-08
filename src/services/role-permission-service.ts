import { RolePermission } from '~/models'
import { ApiError } from '~/types'
import { CreateRolePermissionBody, UpdateRolePermissionBody } from '~/validations'
import { ApiMessage, httpStatus } from '~/constants'
import { permissionService, roleService } from '~/services'

export const createRolePermission = async (roleId: string, body: CreateRolePermissionBody[]) => {
  try {
    return await RolePermission.insertMany(
      body.map((item) => ({
        RoleId: roleId,
        PermissionId: item.PermissionId,
        C: item.C,
        R: item.R,
        U: item.U,
        D: item.D
      })),
      { ordered: false }
    )
  } catch {
    throw new ApiError(httpStatus.CONFLICT, ApiMessage.RecordAlreadyExist)
  }
}

export const getRolePermission = async (roleId: string) => {
  const role = await roleService.getRoleById(roleId)
  const permissions = await RolePermission.find({ RoleId: roleId })
  return {
    RoleId: roleId,
    RoleName: role.RoleName,
    Permissions: await Promise.all(
      permissions.map(async (item) => {
        const permission = await permissionService.getPermissionById(item.PermissionId)
        return {
          Id: item.id,
          PermissionId: item.PermissionId,
          PermissionName: permission.PermissionName,
          C: item.C,
          R: item.R,
          U: item.U,
          D: item.D
        }
      })
    )
  }
}

export const updateRolePermission = async (body: UpdateRolePermissionBody[]) => {
  const updatePromises = body.map(async (item) => {
    const permission = await RolePermission.findById(item.Id)
    if (!permission) {
      throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.RecordNotFound)
    }
    return await RolePermission.findByIdAndUpdate(
      item.Id,
      {
        C: item.C,
        R: item.R,
        U: item.U,
        D: item.D
      },
      { new: true }
    )
  })
  return await Promise.all(updatePromises)
}

export const deleteRolePermission = async (ids: string[]) => {
  const permissions = await RolePermission.deleteMany({ _id: { $in: ids } })
  if (permissions.deletedCount === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.RecordNotFound)
  }
}
