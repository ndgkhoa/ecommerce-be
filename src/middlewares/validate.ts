import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

import { ApiError } from '~/types'
import { HttpStatusCode, Message } from '~/constants'

export const validate = (schema: Record<string, ZodSchema>) => (req: Request, res: Response, next: NextFunction) => {
  for (const key of ['body', 'query', 'params'] as const) {
    if (schema[key]) {
      const result = schema[key].safeParse(req[key])
      if (!result.success) {
        let message = result.error.errors[0].message
        if (message.toLowerCase() === 'required') {
          message = Message.MISSING_REQUIRED_FIELDS
        }
        return next(new ApiError(HttpStatusCode.BAD_REQUEST, message))
      }
      req[key] = result.data
    }
  }
  return next()
}
