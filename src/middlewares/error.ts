import { Request, Response, NextFunction } from 'express'

import sendApiResponse, { ApiError } from '~/utils/api-helper'

export const errorConverter = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!(err instanceof ApiError)) {
    err = new ApiError(500, 'Internal Server Error')
  }
  next(err)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(res, err.status, null, err.message)
}
