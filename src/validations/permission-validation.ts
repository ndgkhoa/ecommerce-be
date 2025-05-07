import { z } from 'zod'

import { objectId } from '~/validations/custom-validation'

export const createPermissionSchema = {
  body: z.object({
    PermissionCode: z.string(),
    PermissionName: z.string()
  })
}

export const updatePermissionSchema = {
  params: z.object({
    id: objectId
  }),
  body: createPermissionSchema.body
}

export type CreatePermissionBody = z.infer<typeof createPermissionSchema.body>
export type UpdatePermissionBody = z.infer<typeof updatePermissionSchema.body>
