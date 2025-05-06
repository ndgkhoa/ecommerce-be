import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { JsonWebTokenError } from 'jsonwebtoken'

import { ApiError } from '~/types'
import { sendResponse } from '~/utils/helpers'

export const errorConverter = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!(err instanceof ApiError)) {
    let status = 500
    let message = 'Internal Server Error'
    if (err instanceof ZodError) {
      status = 400
      message = err.errors[0].message
    }
    if (err instanceof JsonWebTokenError) {
      status = 401
      message = err.message
    }
    err = new ApiError(status, message)
  }
  next(err)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, err.status, null, err.message)
}
