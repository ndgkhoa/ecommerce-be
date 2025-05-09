import { RolePermission } from '~/models'
import { ApiError } from '~/types'
import { CreateRolePermissionBody, UpdateRolePermissionBody } from '~/validations'
import { HttpStatusCode, Message } from '~/constants'
import { permissionService, roleService } from '~/services'

export const createRolePermissions = async (roleId: string, body: CreateRolePermissionBody[]) => {
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
    throw new ApiError(HttpStatusCode.CONFLICT, Message.CONFLICT)
  }
}

export const getRolePermissions = async (roleId: string) => {
  const role = await roleService.getRoleById(roleId)
  const rolePermissions = await RolePermission.find({ RoleId: roleId })
  return {
    RoleId: roleId,
    RoleName: role.RoleName,
    Permissions: await Promise.all(
      rolePermissions.map(async (item) => {
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

export const updateRolePermissions = async (body: UpdateRolePermissionBody[]) => {
  return await Promise.all(
    body.map(async (item) => {
      const rolePermissions = await RolePermission.findById(item.Id)
      if (!rolePermissions) {
        throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
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
  )
}

export const deleteRolePermissions = async (ids: string[]) => {
  const deletedRolePermissions = await RolePermission.deleteMany({ _id: { $in: ids } })
  if (deletedRolePermissions.deletedCount === 0) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
  }
}
