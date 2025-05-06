import { z } from 'zod'

import { objectId } from '~/validations/custom-validation'

export const createRoleSchema = {
  body: z.object({
    RoleName: z.string()
  })
}

export const updateRoleSchema = {
  params: z.object({
    id: objectId
  }),
  body: createRoleSchema.body
}

export type CreateRoleBody = z.infer<typeof createRoleSchema.body>
export type UpdateRoleBody = z.infer<typeof updateRoleSchema.body>
