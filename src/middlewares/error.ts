import { Request, Response, NextFunction } from 'express'

import { ApiError } from '~/types'
import sendResponse from '~/utils/send-response'

export const errorConverter = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!(err instanceof ApiError)) {
    console.log('err', err)

    err = new ApiError(500, 'Internal Server Error')
  }
  next(err)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, err.status, null, err.message)
}
