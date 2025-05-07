import { Request, Response } from 'express'

import { permissionService, rolePermissionService, roleService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { ApiMessage, httpStatus } from '~/constants'
import { RolePermission } from '~/models'

export const getRolePermission = async (req: Request, res: Response) => {
  try {
    const { roleId } = req.params

    const role = await roleService.getRoleById(roleId)
    const activities = await RolePermission.find({ RoleId: roleId })

    const resa = await Promise.all(
      activities.map(async (item) => {
        const perm = await permissionService.getPermissionById(item.PermissionId)
        return {
          Id: item.id,
          PermissionId: item.PermissionId,
          PermissionName: perm.PermissionName,
          C: item.C,
          R: item.R,
          U: item.U,
          D: item.D
        }
      })
    )

    const response = {
      RoleId: roleId,
      RoleName: role.RoleName,
      Permissions: resa
    }

    res.status(200).json({
      StatusCode: 200,
      Message: 'Successful.',
      TotalRecord: activities.length,
      Data: response
    })
  } catch (err) {
    res.status(500).json({ StatusCode: 500, Message: 'Server error.', Error: err })
  }
}

export const createRolePermission = async (req: Request, res: Response) => {
  try {
    const { roleId } = req.params
    const data = req.body

    const newPermissions = data.map((item: any) => ({
      RoleId: roleId,
      PermissionId: item.Id,
      C: item.C,
      R: item.R,
      U: item.U,
      D: item.D
    }))

    const inserted = await RolePermission.insertMany(newPermissions, {
      ordered: false // bỏ qua lỗi nếu có trùng
    })

    res.status(201).json({
      StatusCode: 201,
      Message: 'Created successfully.',
      Data: inserted
    })
  } catch (err: any) {
    // Lỗi trùng khóa
    if (err.code === 11000 || err.writeErrors) {
      return res.status(200).json({
        StatusCode: 200,
        Message: 'Some permissions already existed. Others were inserted.',
        Error: err.writeErrors?.map((e: any) => e.errmsg)
      })
    }

    res.status(500).json({
      StatusCode: 500,
      Message: 'Create failed.',
      Error: err.message
    })
  }
}

export const updateRolePermission = async (req: Request, res: Response) => {
  //   const updatedPermission = await rolePermissionService.updatePermissionById(req.params.id, req.body)
  //   sendResponse(res, httpStatus.OK, updatedPermission, ApiMessage.Success)
  try {
    const updates = req.body
    for (const item of updates) {
      await RolePermission.findByIdAndUpdate(item.Id, {
        C: item.C,
        R: item.R,
        U: item.U,
        D: item.D
      })
    }

    res.status(200).json({ StatusCode: 200, Message: 'Updated successfully.' })
  } catch (err) {
    res.status(500).json({ StatusCode: 500, Message: 'Update failed.', Error: err })
  }
}

export const deleteRolePermission = async (req: Request, res: Response) => {
  //   await rolePermissionService.deletePermissionById(req.params.id)
  //   sendResponse(res, httpStatus.OK, null, ApiMessage.Success)
  try {
    const ids = req.body
    await RolePermission.deleteMany({ _id: { $in: ids } })
    res.status(200).json({ StatusCode: 200, Message: 'Deleted successfully.' })
  } catch (err) {
    res.status(500).json({ StatusCode: 500, Message: 'Delete failed.', Error: err })
  }
}
