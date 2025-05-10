import { Permission, RolePermissions } from '~/models'
import { ApiError } from '~/types'
import { CreateRolePermissionsBody, UpdateRolePermissionsBody } from '~/validations'
import { HttpStatusCode, Message } from '~/constants'
import { roleService } from '~/services'

export const createPermissionsForRole = async (roleId: string, body: CreateRolePermissionsBody[]) => {
  try {
    return await RolePermissions.insertMany(
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

export const getPermissionsByRoleId = async (roleId: string) => {
  const [role, rolePermissions] = await Promise.all([
    roleService.getRoleById(roleId),
    RolePermissions.find({ RoleId: roleId })
  ])
  const permissions = await Permission.find({
    _id: { $in: rolePermissions.map((item) => item.PermissionId) }
  })
  const permissionMap = Object.fromEntries(permissions.map((p) => [String(p._id), p.PermissionName]))
  return {
    RoleId: roleId,
    RoleName: role.RoleName,
    Permissions: rolePermissions.map((item) => ({
      Id: item.id,
      PermissionId: item.PermissionId,
      PermissionName: permissionMap[item.PermissionId] || '',
      C: item.C,
      R: item.R,
      U: item.U,
      D: item.D
    }))
  }
}

export const updateRolePermissions = async (body: UpdateRolePermissionsBody[]) => {
  return await Promise.all(
    body.map(async ({ Id, C, R, U, D }) => {
      const updatedRolePermissions = await RolePermissions.exists({ _id: Id })
      if (!updatedRolePermissions) {
        throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
      }
      return await RolePermissions.findByIdAndUpdate(Id, { C, R, U, D }, { new: true })
    })
  )
}

export const deleteRolePermissions = async (ids: string[]) => {
  const deletedRolePermissions = await RolePermissions.deleteMany({ _id: { $in: ids } })
  if (deletedRolePermissions.deletedCount === 0) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
  }
}
