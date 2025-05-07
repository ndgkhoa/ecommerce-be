import { z } from 'zod'

import { objectId } from '~/validations/custom-validation'

export const createRolePermissionSchema = {
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

export const updateRolePermissionSchema = createRolePermissionSchema

export type CreateRolePermissionBody = z.infer<typeof createRolePermissionSchema.body>
export type UpdateRolePermissionBody = z.infer<typeof updateRolePermissionSchema.body>
