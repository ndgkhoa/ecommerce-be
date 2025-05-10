import { z } from 'zod'

import { objectId } from '~/validations/custom-validation'

export const createRolePermissionsSchema = {
  params: z.object({
    roleId: objectId
  }),
  body: z.object({
    RoleId: objectId,
    PermissionId: objectId,
    C: z.boolean(),
    R: z.boolean(),
    U: z.boolean(),
    D: z.boolean()
  })
}

export const updateRolePermissionsSchema = {
  body: createRolePermissionsSchema.body.omit({ RoleId: true, PermissionId: true }).extend({ Id: objectId })
}

export type CreateRolePermissionsBody = z.infer<typeof createRolePermissionsSchema.body>
export type UpdateRolePermissionsBody = z.infer<typeof updateRolePermissionsSchema.body>
