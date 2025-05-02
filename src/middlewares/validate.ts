import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

import { ApiError } from '~/types'

export const validate = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) throw new ApiError(400, result.error.errors[0].message)
    next()
  }
}
