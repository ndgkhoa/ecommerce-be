import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

import { ApiError } from '~/types'
import sendResponse from '~/utils/response'

export const errorConverter = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let status = 500
  let message = 'Internal server error.'
  if (!(err instanceof ApiError)) {
    if (err instanceof mongoose.Error) {
      status = 400
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
