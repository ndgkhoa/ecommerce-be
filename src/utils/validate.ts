import httpStatus from 'http-status'
import { ZodSchema } from 'zod'

import { ApiError } from '~/types'

const validate = <T>(schema: ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data)
  if (!result.success) throw new ApiError(httpStatus.BAD_REQUEST, result.error.errors[0].message)
  return result.data
}

export default validate
