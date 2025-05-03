import { Request, Response, NextFunction } from 'express'

import { ApiError, ErrorName } from '~/types'
import logger from '~/utils/logger'
import sendResponse from '~/utils/response'

export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('errorConverter', err);
  
  let status = 500
  let message = 'Internal server error.'
  if (!(err instanceof ApiError)) {
    switch (err.constructor.name) {
      case ErrorName.Mongoose:
        status = 400
        message = err.message
        break
      case ErrorName.Zod:
        status = 400
        message = err.errors[0].message
        break
      case ErrorName.Jwt:
        status = 401
        message = err.message
        break
      default:
        logger.error('Unhandled error type:', err.constructor.name)
        break
    }
    err = new ApiError(status, message)
  }
  next(err)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, err.status, null, err.message)
}
