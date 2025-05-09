import { z } from 'zod'

import { objectId } from '~/validations/custom-validation'

export const createUserRoleSchema = {
  params: z.object({
    userId: objectId
  }),
  body: z.object({
    RoleId: objectId
  })
}

export type CreateUserRoleBody = z.infer<typeof createUserRoleSchema.body>
