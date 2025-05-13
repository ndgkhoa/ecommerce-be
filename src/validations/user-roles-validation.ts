import { z } from 'zod'

import { objectId } from '~/validations/custom-validation'

export const getUserRoles = {
  query: z.object({
    userId: objectId
  })
}

export const createUserRolesSchema = {
  params: z.object({
    userId: objectId
  }),
  body: z.object({
    RoleId: objectId
  })
}

export type CreateUserRolesBody = z.infer<typeof createUserRolesSchema.body>
